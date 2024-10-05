import CallList from "@/components/CallList";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10  text-[#3A506B] ">
      <h1 className="text-3xl font-bold">Previous Calls</h1>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;