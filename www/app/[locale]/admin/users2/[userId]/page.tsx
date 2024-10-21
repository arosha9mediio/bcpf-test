import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { client } from "@/lib/client";
  import UserForm from "./components/user-form";
  import { FindUserQuery } from "@/lib/__generated/sdk";
  import { Locale, getDictionary } from "@/dictionaries";
  
  interface Props {
    params: { userId: string; locale: Locale };
  }
  
  const CreateOrEditUser: React.FC<Props> = async ({ params }) => {
    let user: FindUserQuery | null;
    user =
      params.userId === "new"
        ? null
        : await client.findUser({
            id: params.userId,
          }); /* Fetch the post */
  
    const dict = await getDictionary(params.locale);
  
    return (
      <ScrollArea className="flex h-full overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle>{dict.admin_user_create_title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <span>{dict.admin_user_create_subtitle}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <UserForm user={user?.findUser} />
          </CardContent>
        </Card>
      </ScrollArea>
    );
  };
  
  export default CreateOrEditUser;
  