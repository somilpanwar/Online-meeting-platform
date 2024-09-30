import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetcall = (id: string | string[]) => {
  const [call, setCall] = useState<Call>(); // Use lowercase 'call'
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) {
      setIsCallLoading(false); 
      return;
    }

    const loadCall = async () => {
      try {
     
        const { calls } = await client.queryCalls({ filter_conditions: { id } });

       

        if (calls.length > 0) {
          setCall(calls[0]); // Set the first call if found
        } else {
          console.log("No calls found for the given ID");
        // Explicitly set to null if no calls found
        }
      } catch (error) {
        console.error("Error fetching call:", error);
        // Explicitly set to null on error
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading }; // Return lowercase 'call'
};
