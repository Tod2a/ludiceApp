import { images } from '@/constants/images';
import { logout } from '@/utils/auth';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const profile = () => {
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setLoggedOut(true);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  if (loggedOut) {
    return <Redirect href="/" />;
  }

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <TouchableOpacity
        className="mt-5 bottom-5 left-0 right-0 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-base">{loading ? "Logging out..." : "Logout"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default profile