import React, {useRef, useEffect, useState} from 'react';
import {View, Animated, TouchableWithoutFeedback} from 'react-native';

interface BottomMenuProps {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

export default function BottomMenu({
  isOpen,
  onCancel,
  children,
}: BottomMenuProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, slideAnim, opacityAnim]);

  if (!isOpen) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onCancel}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          // opacity: opacityAnim,
        }}
        className="absolute inset-0 z-50">
        <TouchableWithoutFeedback>
          <Animated.View
            style={{
              transform: [{translateY: slideAnim}],
            }}
            className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl p-4">
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
