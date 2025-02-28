import { IPlanBlock } from "../../../shared/hooks/useGetPlanExam";

export const StepikItem = ({ data, type }: IPlanBlock) => {
  if (type === "title") return <h2>{data}</h2>;
  if (type === "image") return <img height={400} src={data} />;
  if (type === "text") {
    const parts = data.split(/<br\s*\/?>/);

    const filteredParts = parts?.filter((part) => part.trim() !== "");
    return (
      <div>
        {filteredParts.map((el) => (
          <div>{el}</div>
        ))}
      </div>
    );
  }
  return null;
};
