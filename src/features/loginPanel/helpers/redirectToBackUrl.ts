import router from 'next/router';

export const redirectToBackUrl = (
   defaultUrl: string,
   timeout: number,
): void => {
   setTimeout(() => {
      if (router.query?.backUrl) {
         router.push(router.query.backUrl as string);
      }

      router.push(defaultUrl);
   }, timeout);
};
