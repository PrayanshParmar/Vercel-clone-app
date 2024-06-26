"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSlug } from "random-word-slugs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import axios from "axios";
import { ActionTooltip } from "../action-tooltip";
import { HelpCircle } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { imagePath } from "@/lib/image-path";

const KeyPairSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const KeyPairsSchema = z.array(KeyPairSchema);

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Project name must be at least 5 characters.",
  }),
  full_name: z.string(),
  gitURL: z.string().url(),
  subDomain: z.string().min(5, {
    message: "Subdomain name must be at least 5 characters.",
  }),
  rootDirectory: z.string(),
  branch: z.string(),
  framework: z.string(),
  installCommand: z.string().optional(),
  buildCommand: z.string().optional(),
  environmentVariables: KeyPairsSchema.default([]),
});
interface ConfigureProjectProps {
  setDeployId: React.Dispatch<React.SetStateAction<string>>;
  fetchingComplete: boolean;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
}

const ConfigureProject = ({
  setDeployId,
  fetchingComplete,
  setProjectId,
  setProjectName,
}: ConfigureProjectProps) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const name = searchParams.get("name") || "";
  const full_name = searchParams.get("full_name") || "";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: full_name,
      name: name,
      subDomain: generateSlug(),
      gitURL: "",
      rootDirectory: "./",
      branch: "main" || "master",
      installCommand: "NPM_INSTALL",
      buildCommand: "NPM_RUN_BUILD",
      framework: "other",
      environmentVariables: [{ key: "", value: "" }],
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    form.setValue("full_name", full_name);
    findBranch();
    findCloneUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full_name]);

  const { control } = form;

  const { append, remove } = useFieldArray({
    control,
    name: "environmentVariables",
  });
  const [isAddEnabled, setIsAddEnabled] = useState<boolean>(false);

  const findBranch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${full_name}/branches`
      );
      const branches = response.data.map((branch: any) => branch.name);
      form.setValue("branch", branches[0]);
      setBranches(branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const findCloneUrl = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${full_name}`
      );
      const cloneRepoUrl = response.data.clone_url;
      form.setValue("gitURL", cloneRepoUrl);
    } catch (error) {
      console.error("Error fetching repo:", error);
    }
  };

  const [branches, setBranches] = useState<string[]>([]);
  const [hideform, setHideform] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post("/api/project", values)
        .then(function (response) {
          form.reset();
          setHideform(true);
          setProjectId(response.data.id);
          setProjectName(response.data.name);
          onDeploy(response.data.id);
          toast({
            variant: "success",
            title: "Deployment started",
          });
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            toast({
              variant: "destructive",
              title: error.response.data,
            });
          }
        });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  const onDeploy = async (id: string) => {
    try {
      await axios
        .post("/api/project/deploy", { projectId: id })
        .then(function (response) {
          setDeployId(response.data.id);
          toast({
            variant: "success",
            title: "Logs will appears shortly",
          });
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            toast({
              variant: "destructive",
              title: error.response.data,
            });
          }
        });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }
  };

  if (hideform) {
    return (
      <div className=" w-full flex items-center justify-center ">
        <Button
          onClick={() => setHideform(false)}
          variant="outline"
          disabled={!fetchingComplete}
        >
          Configure Project
        </Button>
      </div>
    );
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repo</FormLabel>
                <FormControl>
                  <Input disabled={true} defaultValue={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Subdomain</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch: string, index: number) => (
                      <SelectItem key={index} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rootDirectory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className=" flex items-center gap-2">
                    Mono Repo
                    <ActionTooltip label="Enter the root directory of your app (e.g. src/myapp).">
                      <HelpCircle strokeWidth={1} size={20} />
                    </ActionTooltip>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="framework"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className=" flex items-center gap-2">
                    Framework
                    <ActionTooltip label="Select the front-end framework">
                      <HelpCircle strokeWidth={1} size={20} />
                    </ActionTooltip>
                  </div>
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="angular">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.angular} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Angular</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Astro">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.astro} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Astro</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="react">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.react} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <div>Create React App</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="remix">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.remix} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>remix</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="nuxt">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.nuxt} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Nuxt</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="svelte">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.svelte} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Svelte</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vite">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.vite} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Vite</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vue">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.vue} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Vue</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <div className=" flex items-center gap-2">
                        <Avatar className=" rounded-none w-5 h-5 ">
                          <AvatarImage src={imagePath.frameworks.other} />
                          <AvatarFallback>
                            <Skeleton />
                          </AvatarFallback>
                        </Avatar>
                        <span>Other</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="installCommand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className=" flex items-center gap-2">
                    Install Command
                    <ActionTooltip label="The command that is used to install your Project's software dependencies.">
                      <HelpCircle strokeWidth={1} size={20} />
                    </ActionTooltip>
                  </div>
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NPM_INSTALL">NPM_INSTALL</SelectItem>
                    <SelectItem value="YARN_INSTALL">YARN_INSTALL</SelectItem>
                    <SelectItem value="PNPM_INSTALL">PNPM_INSTALL</SelectItem>
                    <SelectItem value="BUN_INSTALL">BUN_INSTALL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buildCommand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className=" flex items-center gap-2">
                    Build Command
                    <ActionTooltip label="The command your frontend framework provides for compiling your code.">
                      <HelpCircle strokeWidth={1} size={20} />
                    </ActionTooltip>
                  </div>
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NPM_RUN_BUILD">NPM_RUN_BUILD</SelectItem>
                    <SelectItem value="YARN_RUN_BUILD">
                      YARN_RUN_BUILD
                    </SelectItem>
                    <SelectItem value="PNPM_RUN_BUILD">
                      PNPM_RUN_BUILD
                    </SelectItem>
                    <SelectItem value="BUN_RUN_BUILD">BUN_RUN_BUILD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="environmentVariables"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment Variables</FormLabel>
                {field.value.map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Key"
                        {...field}
                        name={`environmentVariables[${index}].key`}
                        value={item.key || ""}
                        onChange={(e) => {
                          const key = e.target.value;
                          const newValue = [...field.value];
                          newValue[index].key = key;
                          field.onChange(newValue);
                          setIsAddEnabled(
                            !!newValue[index].key && !!newValue[index].value
                          ); // Ensure we're passing a boolean value
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Value"
                        {...field}
                        name={`environmentVariables[${index}].value`}
                        value={item.value || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newValue = [...field.value];
                          newValue[index].value = value;
                          field.onChange(newValue);
                          setIsAddEnabled(
                            !!newValue[index].key && !!newValue[index].value
                          ); // Ensure we're passing a boolean value
                        }}
                      />
                    </FormControl>
                    {index !== 0 && (
                      <Button type="button" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  className=" mt-2"
                  type="button"
                  onClick={() => {
                    if (isAddEnabled) {
                      append({ key: "", value: "" });
                      setIsAddEnabled(false);
                    }
                  }}
                  disabled={!isAddEnabled}
                >
                  Add
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>Deploy</Button>
        </form>
      </Form>
    </>
  );
};

export default ConfigureProject;
