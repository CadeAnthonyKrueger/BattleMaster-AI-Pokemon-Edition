import { useEffect } from "react";

interface UseScrollToCenterProps {
    self: React.RefObject<HTMLElement | null>;
    parent: React.RefObject<HTMLElement | null>;
    cond: boolean;
}

const useScrollToCenter = ({ self, parent, cond }: UseScrollToCenterProps) => {

  useEffect(() => {
      if (self.current && parent.current && cond) {
          const refCenter = self.current.offsetLeft + self.current.offsetWidth / 2;
          const parentCenter = parent.current.scrollLeft + parent.current.clientWidth / 2;
          const scrollToPosition = refCenter - parentCenter;

          parent.current.scrollTo({
              left: parent.current.scrollLeft + scrollToPosition,
              behavior: "smooth",
          });
      }
  }, [cond, self, parent]);

};

export default useScrollToCenter;
