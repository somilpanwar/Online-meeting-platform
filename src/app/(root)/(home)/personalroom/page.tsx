"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetcall } from "@/../hooks/useGetcall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";


const Table = ({
  title,
  description,
  classname
}: {
  title: string;
  description: string;
  classname:string
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className={cn("truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl",classname)}>
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();


  const meetingId = user?.id;

  const { call } = useGetcall(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `http://localhost:3000//meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} classname={''}/>
        <Table title="Meeting ID" description={meetingId!} classname={'hover:text-blue-600 hover:underline'}/>
        <Table title="Invite Link" description={meetingLink} classname={'hover:text-blue-600 hover:underline'}/>
      </div>
      <div className="flex gap-5">
        <Button className="bg-green-600 text-xl" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-green-700 text-xl"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success(
              "Link Copied!",{
                position:"top-right"
              }
            )
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;