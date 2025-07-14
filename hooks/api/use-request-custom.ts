import {getResponseErrorMessage} from "@/hooks/api/utils";
import useAuthTokens from "@/hooks/auth/use-auth-tokens";

// there is a bug in axios when using post form in React Native. Must fetch manually using this hook.
const useRequestCustom = () => {
  const {onGetAccessToken} = useAuthTokens();

  const onRequestCustom = async (url: string, body: any) => {
    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${await onGetAccessToken()}`,
      },
    });
    try {
      let result;
      try {
        result = await response.json();
      } catch (e) {
        console.warn(e);
      }

      return {result, ok: true, errors: []};
    } catch (error) {
      console.error('Request failed', error);
      const errorMessage = getResponseErrorMessage(error);
      return {result: null, ok: false, error, errorMessage};
    }
  }

  return {onRequestCustom,}
}
export default useRequestCustom;
