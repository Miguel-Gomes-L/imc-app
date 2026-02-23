import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [peso, setPeso] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [Imc, setIMC] = useState<number | null>(null);
    const [classificacao, setClassificacao] = useState<string | null>(null);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);

    function validarCampos(){
        if (!peso || !altura) {
            setMensagemErro("Preencha o peso e a altura");
            return;
        }

        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);

        if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
            setMensagemErro("Digite valores numéricos válidos para peso e altura");
            return;
        }

        setMensagemErro(null);
        calculoIMC();
    }

    function calculoIMC() {
        let imcCalculado = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
        setIMC(imcCalculado);
        if(imcCalculado < 18.5){
            setClassificacao("Abaixo do peso");
        } else if(imcCalculado < 25){
            setClassificacao("Peso normal");
        }else if(imcCalculado < 30){
            setClassificacao("Sobrepeso");
        }else{
            setClassificacao("Obeso");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo} source={require('./assets/logo-app-imc.png')} />
            </View>

            <View style={styles.form}>
                {mensagemErro && (
                    <Text style={styles.mensagemErro}>{mensagemErro}</Text>
                )}

                <Text style={styles.label}>Altura</Text>
                <TextInput style={styles.campo} onChangeText={setAltura} value={altura}></TextInput>

                <Text style={styles.label}>Peso</Text>
                <TextInput style={styles.campo} onChangeText={setPeso} value={peso}></TextInput>

                <TouchableOpacity 
                style={styles.btn}
                onPress={validarCampos}
                >
                    <Text style={styles.btntext}>Calcular</Text>
                </TouchableOpacity>

                {Imc && (
                    <View style={styles.resultado}>
                        <Text style={styles.labelResultado}>Seu IMC é:</Text>  
                        <Text style={styles.resultadoIMC}>{Imc?.toFixed(1)}</Text>  
                        <Text style={styles.labelResultado}>Classificação: </Text>  
                        <Text style={styles.classificacaoIMC}>{classificacao}</Text>  
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
    mensagemErro: {
        backgroundColor: "#F33",
        color: "#FFF",
        padding: 15,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    }
});
