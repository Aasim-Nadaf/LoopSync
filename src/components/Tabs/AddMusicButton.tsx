import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { File, Image, Music2Icon, PlusCircle, User } from "lucide-react";
import { Label } from "../ui/label";

export default function AddMusicButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add Music
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Music</DialogTitle>
          <DialogDescription>
            Add your favorite songs to your library.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Title</Label>
            <InputGroup className="mb-2">
              <InputGroupInput placeholder="Title of Song" />
              <InputGroupAddon>
                <Music2Icon />
              </InputGroupAddon>
            </InputGroup>
            <Label htmlFor="author">Author</Label>
            <InputGroup className="mb-2">
              <InputGroupInput placeholder="Author of Song" />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
            <Label htmlFor="image">Upload your Image</Label>
            <InputGroup className="mb-2">
              <InputGroupInput type="file" />
              <InputGroupAddon>
                <Image />
              </InputGroupAddon>
            </InputGroup>
            <Label htmlFor="file">Upload your File (.mp3)</Label>
            <InputGroup className="mb-2">
              <InputGroupInput type="file" accept=".mp3" />
              <InputGroupAddon>
                <File />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button>Add Music</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
