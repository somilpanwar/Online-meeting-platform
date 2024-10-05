import CallList from '@/components/CallList';

const RecordingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-[#3A506B]">
      <h1 className="text-3xl font-bold">Recordings</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default RecordingPage;