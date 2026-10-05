import { Dialog } from "@base-ui/react/dialog";
import { LogOut, X } from "lucide-react";

const ModalAvatar = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Tizimdan chiqish oynasini ochish"
        className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#748093] outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#e8622a]"
      >
        <LogOut size={20} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 min-h-dvh bg-[#101318]/35 backdrop-blur-[2px] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#e1e4e9] bg-white p-5 text-[#101318] shadow-[0_24px_70px_-20px_rgba(16,19,24,0.35)] outline-none transition duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-base font-semibold">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-[#687385]">
                {description}
              </Dialog.Description>
            </div>

            <Dialog.Close
              aria-label="Modalni yopish"
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#778294] transition hover:bg-[#f1f2f4] hover:text-[#101318] focus-visible:outline-2 focus-visible:outline-[#e8622a]"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalAvatar;
