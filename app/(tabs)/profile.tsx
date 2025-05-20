import PrimaryButton from '@/components/buttons/PrimaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { images } from '@/constants/images';
import { getUserName, logout } from '@/utils/auth';
import { Redirect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';

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
    return <CustomActivityIndicator />;
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

        <View className='mt-5 mx-5'>
          <PrimaryButton
            text="Votre Ludothèque"
            onPress={() => router.push("/library")}
          />
        </View>

        <View className='mt-5 mx-5'>
          <PrimaryButton
            text={loading ? "Logging out..." : "Déconnexion"}
            onPress={handleLogout}
          />
        </View>

      </View>
    </View>
  )
}

export default profile