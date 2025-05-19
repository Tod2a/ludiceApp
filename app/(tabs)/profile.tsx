import { images } from '@/constants/images';
import { getUserName, logout } from '@/utils/auth';
import { Redirect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, Text, TouchableOpacity, View } from 'react-native';

const profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkName = async () => {
      try {
        const name = await getUserName();
        setUserName(name as string);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      } finally {
        setLoading(false);
      }
    };

    checkName();
  }, []);

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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />;
  }

  if (loggedOut) {
    return <Redirect href="/" />;
  }

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className='flex-1 justify-center'>
        <View className='items-center mb-5'>
          <Text className='text-white mb-2'>Bonjour {userName}!</Text>
          <Text className='text-white mx-5'>
            Pour modifier votre profil, veuillez vous rendre sur
            <Text className='text-green-200' onPress={() => Linking.openURL('https://ludice.app')}> notre page web</Text>
          </Text>
        </View>

        <TouchableOpacity
          className="mt-5 mx-5 bottom-3 left-0 right-0 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          onPress={() => router.navigate("/library")}

        >
          <Text className="text-white font-semibold text-base">Votre Ludothèque</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-5 mx-5 bottom-5 left-0 right-0 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-base">{loading ? "Logging out..." : "Déconnexion"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default profile