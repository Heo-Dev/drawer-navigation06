import { Alert } from "react-native";

/***
 * alert message
 */
export const showAlert = (tp, error) => {
    Alert.alert(
        tp == 'error' ? '에러' : 
        tp == 'info' ? '안내' : '',
        error,
        [
            { text: "확인", 
              onPress: () => console.log(error)
            },
        ],
        { cancelable: false }
        );
};


/***
 * 숫자에 콤마 찍기
 */
export const numberFormat = (x) => {
    if (x !== undefined && typeof x === 'number') {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return "Invalid input"; // 혹은 다른 기본값으로 변경 가능
    }
}
