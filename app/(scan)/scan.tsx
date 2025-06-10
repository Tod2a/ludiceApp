import BackMenuButton from '@/components/buttons/BackMenuButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { images } from '@/constants/images';
import { fetchGamesEAN } from '@/services/api/game';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, Text, View } from 'react-native';

function Scan() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View className='mt-10'>
                <Text>Nous avons besoin de votre permission pour utiliser la caméra</Text>
                <Button title="Accorder la permission" onPress={requestPermission} />
            </View>
        );
    }

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        setScanned(true);

        const id = await fetchGamesEAN(data);

        if (id > 0) {
            router.push(`/games/${id}`);
        } else {
            alert(`Jeu non trouvé, les requêtes arrivent bientôt`);
            router.back();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13'],
                }}
            />
            {scanned && (
                <View className="absolute inset-0 bg-primary/90 justify-center items-center">
                    <Image
                        source={images.bg}
                        className="absolute inset-0 w-full h-full"
                        resizeMode="cover"
                    />
                    <PrimaryButton
                        text="Appuyez pour scanner à nouveau"
                        onPress={() => setScanned(false)}
                    />
                    <BackMenuButton
                        text="Retour"
                        onPress={() => router.push('/')}
                    />
                </View>
            )}
        </View>
    );
}

export default Scan;
