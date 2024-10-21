"use client";

import AlertModal from "@/components/modals/alert-modal";
import IconButton from "@/components/ui/IconButton";
import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import { useAlertModal } from "@/hooks/use-alert-modal";
import useBoolean from "@/hooks/useBoolean";
import { client } from "@/lib/client";
import { formatDate } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, MouseEventHandler } from "react";

type SliderCardProps = {
  id: string;
  image: string;
  title: String;
  subtitle?: string;
  description: string;
  publishedAt?: string;
  unpublishedAt?: string;
  categoryId: number;
};

type SliderCardType = (props: SliderCardProps) => JSX.Element;

const SliderCard: SliderCardType = ({
  id,
  image,
  title,
  subtitle,
  description,
  publishedAt,
  unpublishedAt,
  categoryId,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  // const onUpdate = () => {
  //   const path =
  //     categoryId === 6
  //       ? RoutePaths.addAdminHomeMainSlider.value(id)
  //       : RoutePaths.addAdminFeature.value(id);
  //   router.push(path);
  // };

  const onUpdate = () => {
    let path = RoutePaths.addAdminHomeMainSlider.value(id);
    if (categoryId === 6) {
      path = RoutePaths.addAdminHomeMainSlider.value(id);
    } else if (categoryId === 8) {
      path = RoutePaths.addAdminSlider.value(id);
    } else if (categoryId === 7) {
      path = RoutePaths.addAdminFeature.value(id);
    } else if (categoryId === 5) {
      path = RoutePaths.addAdminNotice.value(id);
    } else if (categoryId === 9) {
      path = RoutePaths.addAdminPress.value(id);
    }
    router.push(path);
  };

  const deleteState = useBoolean();
  const { isOpen, onClose, onOpen } = useAlertModal();
  const onDelete: MouseEventHandler<SVGSVGElement> = e => {
    e.stopPropagation();
    onOpen();
  };

  const onConfirmDelete = async () => {
    try {
      deleteState.setValue(true);
      const response = await client.deletePost({ id });
      router.refresh();
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      onClose();
      deleteState.setValue(false);
    }
  };

  return (
    <Fragment>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row">
        <img
          className="w-full sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/5  h-auto sm:min-h-[200px] sm:max-h-[200px]  object-cover object-center "
          src={image}
          alt="Article Image"
        />
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          <p className="text-sm text-gray-600">{description}</p>
          {publishedAt && (
            <p className="text-sm text-gray-600">{`Published: ${formatDate(
              publishedAt,
            )}`}</p>
          )}
          {unpublishedAt && (
            <p className="text-sm text-gray-600">{`Unpublished: ${formatDate(
              unpublishedAt,
            )}`}</p>
          )}
        </div>
        <div className="flex flex-row justify-center p-4">
          <IconButton
            icon={<Trash className="text-red-500" onClick={onDelete} />}
          />
          <IconButton icon={<Edit />} onClick={onUpdate} />
        </div>
      </div>
      <AlertModal
        isOpen={isOpen}
        onConfirm={onConfirmDelete}
        onClose={onClose}
        loading={deleteState.value}
      />
    </Fragment>
  );
};

export { SliderCard };
