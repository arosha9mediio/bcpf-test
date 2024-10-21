"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/error";
import useBoolean from "@/hooks/useBoolean";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status?: string;
  id?: any;
}

const StatusModal = ({ isOpen, onClose, status, id }: StatusModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const createState = useBoolean();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formSchema = z.object({
    passStatus: z.string({ message: "Status must be selected." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      passStatus: status ? status : "",
    },
  });

  const {
    formState: { isValid },
    setValue,
    watch,
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await client.updateApplication({
        input: {
          id: id,
          ...values,
        },
      });
      onClose();
      router.refresh();
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      createState.setValue(false);
    }
  };

  const statusOptions = [
    { value: "접수처리중", label: "접수처리중" },
    { value: "접수완료", label: "접수완료" },
    { value: "미선정", label: "미선정" },
    { value: "1차선정", label: "1차선정" },
    { value: "2차선정", label: "2차선정" },
    { value: "최종선정", label: "최종선정" },
  ];

  const passStatus = watch("passStatus");
  const selectedStatusOption = statusOptions.find(
    option => option.value === passStatus,
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="지원자 처리"
      description="지원자의 처리 상태 변경하기."
      isOpen={isOpen}
      onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="mt-4">
            <FormField
              control={form.control}
              name="passStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>처리상황</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(type => {
                          return (
                            <SelectItem
                              key={type.value}
                              value={type.value.toString()}>
                              {type.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button variant={"outline"} onClick={onClose}>
              취소
            </Button>
            <Button
              variant={"default"}
              disabled={!isValid || createState.value}>
              확인
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StatusModal;
