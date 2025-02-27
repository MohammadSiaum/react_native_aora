import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../../global.css";

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from "../../components/CustomButton";
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',

  });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);

      // set it to global state..

      router.replace('/home');

    } catch (error) {
      Alert.alert('Error', error.message);

    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView>
        <View className="w-full min-h-[85vh] flex justify-center px-4 my-6">

          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link className='text-lg font-psemibold text-secondary' href="/sign-up">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn