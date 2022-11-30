import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';
import rootReducers from './RootReducers';

const storeRedux = createStore(rootReducers, compose(applyMiddleware(thunk)));
export type AppDispatch = typeof storeRedux.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof storeRedux.getState>;
export default storeRedux;
