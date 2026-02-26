import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [peso, setPeso] = useState<string>("");
    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
    const [altura, setAltura] = useState<string>("");
    const [imc, setIMC] = useState<number | null>(null);
    const [classicacao, setClassicacao] = useState<string | null>(null);

 function validarCampos() {

    const pesoLimpo = peso.trim();
    const alturaLimpa = altura.trim();

    if (pesoLimpo === "" || alturaLimpa === "") {
        setMostrarAlerta(true);
        setIMC(null);
        return;
    }

    if (isNaN(Number(pesoLimpo)) || isNaN(Number(alturaLimpa))) {
        setMostrarAlerta(true);
        setIMC(null);
        return;
    }

    setMostrarAlerta(false);
    calculoIMC();
}

    function calculoIMC() {
        let imcCalculado = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
        setIMC(imcCalculado);
        if(imcCalculado < 18.5){
            setClassicacao("Abaixo do peso");
        }else if(imcCalculado < 25){
            setClassicacao("Peso Normal");
        }else if(imcCalculado < 30){
            setClassicacao("Sobrepeso");
        }else{
            setClassicacao("Obeso");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={require('./assets/logo-app-imc.png')} />
            </View>

            <View style={styles.form}>
                {mostrarAlerta && (
                <Text style={styles.alerta}>
                      Preencha o peso e a altura
                        </Text>
                    )}

                <Text style={styles.label}>Altura</Text>
                <TextInput style={styles.campo} onChangeText={setAltura}></TextInput>

                <Text style={styles.label}>Peso</Text>
                <TextInput style={styles.campo} onChangeText={setPeso}></TextInput>

                <TouchableOpacity 
                    style={styles.btn}
                    onPress={validarCampos}
                >
                    <Text style={styles.btntext}>Calcular</Text>
                </TouchableOpacity>

                {imc != null && (
                <View style={styles.resultado}>
                    <Text style={styles.labelResultado}>Seu IMC é:</Text>
                    <Text style={styles.resultadoIMC}>{imc?.toFixed(1)}</Text>
                    <Text style={styles.labelResultado}>Classicação:</Text>
                    <Text style={styles.classificacaoIMC}>{classicacao}</Text>
                </View>
                )}
            </View>

            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06C',
    },
    containerLogo: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 170,
        height: 60
    },
    form: {
        backgroundColor: '#FFF',
        padding: 30,
        height: '100%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
    },
    campo: {
        backgroundColor: '#DDD',
        width: '100%',
        height: 70,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        fontSize: 20
    },
    label: {
        marginBottom: 10,
        fontSize: 22
    },
    btn: {
        backgroundColor: '#F90',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 50,
        height: 70,
        justifyContent: 'center'
    },
    btntext: {
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF',
    },
    resultado: {
        backgroundColor: '#EEE',
        padding: 20,
        borderRadius: 20,
    },
    labelResultado: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10
    },
    resultadoIMC: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 10,
    },
    classificacaoIMC: {
        backgroundColor: "#F00",
        color: "#FFF",
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 10,
    },
    alerta: {
        textAlign: 'center',
        backgroundColor: "#F00",
        color: "#FFF",
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 20
    }
});
