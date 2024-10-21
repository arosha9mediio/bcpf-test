"use client";
import { Button } from "@/components/ui/button";
import CustomDatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UserRoles } from "@/constants/enums";
import useBoolean from "@/hooks/useBoolean";
import { GetMeQuery } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import PhoneVerificationDialog from "./phone-verification-dialog";
import "./styles.css";

const formSchema = z.object({
  name: z.string().min(1),
  birthday: z.date(),
  phone: z.string().min(9),
  gender: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(6),
});

type Props = {
  user: GetMeQuery["getMe"] | null;
  refresh: () => void;
  isAdmin: boolean;
};
// Update profile
const ProfileInfo: React.FC<Props> = ({ user, refresh, isAdmin }) => {
  const { value: formState, setValue: setFormState } = useBoolean();
  const { value: open, setValue: setOpen } = useBoolean(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: user?.UserProfile.name || "",
      birthday: user?.UserProfile?.birthday
        ? new Date(user?.UserProfile?.birthday)
        : new Date(),
      address: user?.UserProfile?.address || "",
      email: user?.email || "",
      gender: user?.UserProfile?.gender?.toString() || "1",
      phone: user?.UserProfile?.phone || "",
    },
  });

  const phone = form.watch("phone");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      delete values.email;
      setFormState(true);
      await client.updateUserProfile({
        updateUserProfileDto: {
          userId: user.id,
          ...values,
          gender: +values.gender,
        },
      });

      // If not admin, U have to send phone number with otp
      if (
        user.role !== UserRoles.ADMIN &&
        user?.UserProfile?.phone !== values.phone
      ) {
        // Sent otp
        await client.sendPhoneVerifyToken({
          sendPhoneVerifyTokenDto: { phone: values.phone },
        });
        setOpen(true);
      }

      toast({
        variant: "default",
        description: "개인정보가 업데이트 되었습니다.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      setFormState(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section>
            <div className="my-page__form">
              <div className="my-page__details">
                <div className="sm:w-2/5 mb-8">
                  <h3>개인정보</h3>
                  <p>이름, 생년월일, 성별</p>
                </div>
                <div className="w-full space-y-8 sm:space-y-12">
                  <div className="sm:flex gap-8 space-y-4 sm:space-y-0 items-center">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Name *"
                              {...field}
                              // className="!rounded-none border-0 !border-b-2 !border-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <CustomDatePicker
                              value={field.value}
                              onChange={field.onChange}
                              // slotProps={{
                              //   textField: {
                              //     // variant: "standard",
                              //     style: {
                              //       width: "100%",
                              //     },
                              //   },
                              // }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Birthdate *"
                            {...field}
                            className="!rounded-none border-0 !border-b-2 !border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  </div>
                  <div className="flex gap-8">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <RadioGroup
                              className="flex flex-row justify-between flex-1 gap-8"
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              value={field.value}>
                              <RadioGroupItem
                                value="0"
                                id="남성"
                                label="남성"
                                checked={field.value === "0"}
                              />

                              <RadioGroupItem
                                value="1"
                                id="여성"
                                label="여성"
                                checked={field.value === "1"}
                              />
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="my-page__details">
                <div className="sm:w-2/5 mb-8">
                  <h3>주소정보</h3>
                  <p>이메일, 연락처, 주소</p>
                </div>
                <div className="w-full space-y-12">
                  <div className="sm:flex gap-8 space-y-12 sm:space-y-0">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="휴대전화번호"
                              {...field}
                              // className="!rounded-none border-0 !border-b-2 !border-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Email *"
                              {...field}
                              // className="!rounded-none border-0 !border-b-2 !border-gray-400"
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Address *"
                              {...field}
                              // className="!rounded-none border-0 !border-b-2 !border-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {!isAdmin ? (
                <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 bg-background border-dotted">
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    type="button">
                    취소하기
                  </Button>
                  <Button disabled={formState}>저장하기</Button>
                </div>
              ) : (
                <div className="flex align-center justify-end">
                  <Button
                    variant="default"
                    className="bg-slate-600 hover:bg-slate-600/95"
                    disabled={formState}>
                    저장하기
                  </Button>
                </div>
              )}
            </div>
          </section>
        </form>
      </Form>
      <PhoneVerificationDialog
        open={open}
        onOpenChange={value => setOpen(value)}
        phone={phone}
      />
    </>
  );
};

export default ProfileInfo;
