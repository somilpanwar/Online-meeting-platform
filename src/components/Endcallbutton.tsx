'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const EndCallButton = () => {
  const call = useCall();    //to get the call where we can get the detail about the create of the meeting
  const router = useRouter();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks(); // by the use of this we can get the get all the hooks present in the setream-io
  const localParticipant = useLocalParticipant(); //to get the current user in the meeting

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id; //here we check wether the participant in the meeting is the owner or not 

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push('/');
  };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;