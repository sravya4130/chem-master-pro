import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const SelectSubject = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Choose Subject">
      <div className="p-6 space-y-4">

        <Button
          className="w-full h-14 text-lg"
          onClick={() => navigate("/physics-topics")}
        >
          Physics
        </Button>

        <Button
          className="w-full h-14 text-lg"
          onClick={() => navigate("/topics")}
        >
          Chemistry
        </Button>

        <Button
          className="w-full h-14 text-lg"
          onClick={() => navigate("/maths-topics")}
        >
          Maths
        </Button>

      </div>
    </AppLayout>
  );
};

export default SelectSubject;
