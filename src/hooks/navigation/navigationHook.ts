import { useNavigation } from "@react-navigation/native"

const useNavigate = () => {
    const navigation = useNavigation();

    const NavigateTo = (screen: string) => {
        if(screen === ''){
            navigation.goBack()
        }else{
            navigation.navigate(screen as never);
        }
    }

    return NavigateTo;
}

export default useNavigate;