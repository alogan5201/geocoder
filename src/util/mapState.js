import { createGlobalState } from "react-use";
export const useGlobalValue = createGlobalState(() => []);
export const useGlobalGeoData = createGlobalState(() => []);
export default {
    useGlobalGeoData,
    useGlobalValue
}