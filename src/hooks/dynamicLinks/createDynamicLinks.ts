import dynamicLinks from '@react-native-firebase/dynamic-links';

const useGenerateDynamicLinks = () => {
   const GenerateDynamicLinks = async (path: string, id: string) => {
    const link = await dynamicLinks().buildLink({
        link: `https://appnox.ai/${path}/${id}`,
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://papago.page.link',
        // optional setup which updates Firebase analytics campaign
        // "banner". This also needs setting up before hand
        analytics: {
          campaign: 'banner',
        },
      });
      return link;
   }
   return GenerateDynamicLinks;
}

export default useGenerateDynamicLinks;