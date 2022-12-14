import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices

import profileViewReducer from './slices/profileView';
import profileReducer from "./slices/profileDetails";


// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    whitelist: [],
};


const profileViewConfig = {
    key: "profileView",
    storage,
    keyPrefix: "redux-",
    whitelist: ["value"],
};

const profileConfig = {
    key: "profile",
    storage,
    keyPrefix: "redux-",
    whitelist: ["value"],
};


const rootReducer = combineReducers({
    profileView: persistReducer(profileViewConfig, profileViewReducer),
    profile: persistReducer(profileConfig, profileReducer),


});

export { rootPersistConfig, rootReducer };
