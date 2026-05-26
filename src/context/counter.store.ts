
import {create} from "zustand"

type CounterStore = {
    counter:number;
    inc: () => void;
    dec: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
    counter : 0 ,

    inc: () => 
        set((state) => ({
            counter: state.counter + 1 ,
        })),

        dec: () => 
        set((state) => ({
            counter: state.counter - 1 ,
        })),
}));