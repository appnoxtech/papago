import { useNavigation } from "@react-navigation/native";
import { getUserDataFromLocalStorage } from "../../utlis/auth";

interface props {
    url: string
}
const useListenDynamicLinks = () => {
    const url = 'https://invertase.io/';
    const navigation = useNavigation();

    const handleDynamicLink = async (link:props) => {
        // Handle dynamic link inside your own application
        const user = await getUserDataFromLocalStorage();
        if (link.url.includes('activity')) {
          // ...navigate to your offers screen
          if(user){
             const subStringList = link.url.split("/");
             const id = subStringList[subStringList.length - 1];
             navigation.navigate('ViewActivity' as never , {id} as never);
          }else {
            navigation.navigate('Login' as never);
          }
        }
      };
    return handleDynamicLink;
}

export default useListenDynamicLinks;