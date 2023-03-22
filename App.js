import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import {useState, useEffect} from 'react';
import {api} from './api.js';


export default function App() {

  const [pokemonInicial, setPokemonInicial] = useState([])
  const [pokemonEscolhido, setPokemonEscolhido] = useState([])

  const getInitialPokemon = ()=>{

    api.get()
      .then(response => {
        const data = response.data.results;
        setPokemonInicial(data);
      })
      .catch((err)=>{
        console.log(err)
        Alert.alert('Erro', 'não foi possível carregar os pokemons')
      })
  }

  const getPokemonData = (url) => {
    api.get(url)
      .then(response => {
        const pokemon = {
          nome: response.data.name,
          img: response.data.sprites.front_shiny,
          peso: response.data.weight
        }
        setPokemonEscolhido(pokemon);
      })
    .catch((err)=>{
        console.log(err)
        Alert.alert('Erro', 'não foi possível carregar os pokemons')
      })
  }

  useEffect(() => {
    getInitialPokemon();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ESCOLHA SEU POKEMON</Text>
      </View>


    {pokemonEscolhido && (
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonName}>Nome: {pokemonEscolhido.nome}</Text>
        <Text style={styles.pokemonWeight}>Peso: {pokemonEscolhido.peso}</Text>
        <Image resizeMode='stretch' style={styles.pokemonImage} source={{ uri: pokemonEscolhido.img }}/>
      </View>
    )}

    <FlatList 
      data={pokemonInicial} 
      renderItem={({ item }) => {
      return(
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <TouchableOpacity onPress={()=> getPokemonData(item.url)} style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Dados do pokemon</Text>
          </TouchableOpacity>

        </View>
        )
      }}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    paddingTop: 40,
    marginBottom: 20,
    backgroundColor: '#e73e33'
  },
  headerTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  },
  pokemonContainer: {
    alignItems: 'center'
  },
  pokemonName: {
    fontSize: 22
  },
  pokemonWeight: {
    fontSize: 18
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardButton: {
    backgroundColor: '#e73e33',
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
  cardButtonText: {
    fontSize: 15,
    color: '#ffff',
    textAlign: 'center'
  }
});