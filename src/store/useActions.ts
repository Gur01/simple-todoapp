import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

const useActions = (actions: any): any => {
    const dispatch = useDispatch();

    return useMemo(() => {
        if (Array.isArray(actions)) {
            return actions.map((a) => bindActionCreators(a, dispatch));
        }
        return bindActionCreators(actions, dispatch);
    }, [actions, dispatch]);
};

export default useActions;
