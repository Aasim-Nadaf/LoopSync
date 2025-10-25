import { Separator } from "@/components/ui/separator";

interface SectionHeaderProps {
  title: string;
  description: string;
  showSeparator?: boolean;
}

export const SectionHeader = ({
  title,
  description,
  showSeparator = false,
}: SectionHeaderProps) => {
  return (
    <>
      <div className="px-4 flex flex-col gap-2">
        <h1 className="text-3xl text-foreground font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {showSeparator && (
        <div className="px-4 pt-4">
          <Separator />
        </div>
      )}
    </>
  );
};
