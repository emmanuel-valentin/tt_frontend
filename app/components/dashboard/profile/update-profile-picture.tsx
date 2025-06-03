import { useSubmit } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Camera, Loader2 } from "lucide-react";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { UserData } from "~/types/user/user.type";
import { useIntentSubmission } from "~/hooks/use-intent-submission";

interface Props {
  userData?: UserData;
}

export function UpdateProfilePicture({ userData }: Props) {
  const submit = useSubmit();
  const isUpdatingAvatar = useIntentSubmission("update-avatar");

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("intent", "update-avatar");
      formData.append("foto", file);
      submit(formData, { method: "POST", encType: "multipart/form-data" });
    }
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <UserAvatar src={userData?.persona.foto_url} className="w-16 h-16" />
        <div className="absolute -bottom-1 -right-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor="profile-picture-input" className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-picture-input"
                  onChange={handleProfilePictureChange}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-full p-0"
                  disabled={isUpdatingAvatar}
                  asChild
                >
                  <span>
                    {isUpdatingAvatar ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Camera className="h-3 w-3" />
                    )}
                  </span>
                </Button>
              </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cambiar foto de perfil</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
