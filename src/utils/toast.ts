import Toast from 'react-native-root-toast';

export const ToastMsg = (
  message: string,
  duration: number = Toast.durations.SHORT,
  position: number = Toast.positions.BOTTOM,
): void => {
  Toast.show(message, {
    duration: duration,
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {}, // 可以在这里添加显示时的回调
    onShown: () => {}, // 可以在这里添加显示完成后的回调
    onHide: () => {}, // 可以在这里添加隐藏时的回调
    onHidden: () => {}, // 可以在这里添加隐藏完成后的回调
  });
};
