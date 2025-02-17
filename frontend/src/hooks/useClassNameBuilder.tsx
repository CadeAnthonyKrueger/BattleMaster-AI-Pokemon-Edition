import { useMemo } from "react";

interface ClassNameCondition {
    cond: boolean;
    class: string;
}

const useClassNameBuilder = (baseClass: string, conditions: ClassNameCondition[]): string => {
    return useMemo(() => {
        const conditionalClasses = conditions
        .filter(condition => condition.cond)
        .map(condition => condition.class)
        .join(' ');

        return [baseClass, conditionalClasses].filter(Boolean).join(' ');
    }, [baseClass, conditions]);
};

export default useClassNameBuilder;
