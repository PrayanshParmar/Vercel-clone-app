"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useModel } from "@/hooks/use-model-store";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Select } from "../ui/select";

const FormSchema = z.object({
  feedback: z
    .string()
    .min(10, {
      message: "Feedback must be at least 10 characters.",
    })
    .max(250, {
      message: "Feedback must not be longer than 350 characters.",
    }),
});

const RootDirectoryModel = () => {
  const { isOpen, onClose, type } = useModel();
  const router = useRouter();

  const isModelOpen = isOpen && type === "rootDirectory";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios
        .post("/api/feedback", values)
        .then(function (response) {
          form.reset();
          router.refresh();
          onClose();
          toast({
            variant: "success",
            title: response.data,
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

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#0A0A0A]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[97%] space-y-6"
          >
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  ></Select>
                  <FormControl>
                    <Textarea
                      placeholder="Your feedback..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              Send
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RootDirectoryModel;
