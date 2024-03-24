import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  ButtonIcon,
  Box,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

import { ArrowRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { set } from "date-fns";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";

const EventScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  useEffect(() => {
    const fetchEventData = async () => {
      const eventDataParams = await route.params?.eventData;
      setEventData(eventDataParams);
    };
    setLoading(false);
    fetchEventData();
  }, []);
  if (loading)
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View className="flex justify-center items-center">
          <LottieView
            source={loadingAnimation}
            style={{ height: 100, aspectRatio: 1 }}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="">
      <View className="">
        <View className="flex flex-row justify-between p-4  items-center ">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-5 mt-4 w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <HStack
            space="md"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <View className="pr-5">
                <Avatar size="md">
                  <AvatarFallbackText>Halid Acar</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: "https://wrong-url",
                    }}
                    alt=""
                    onPress={() => navigation.navigate("Profile")}
                  />
                </Avatar>
              </View>
            </Pressable>
          </HStack>

          {/* <AvatarIcon /> */}
        </View>
        <View className="p-6">
          <View className="items-center">
            {imageLoading && (
              <ActivityIndicator
                style={{ position: "absolute", top: "50%" }}
                size="large"
                color="#0000ff"
              />
            )}
            <Image
              shadow={2}
              onLoad={() => setImageLoading(false)}
              source={{ uri: eventData?.eventImage }}
              //source={require("../assets/ann.jpeg")}
              alt=""
              className="w-[360px] h-[270px] rounded-xl "
            />
          </View>
          <View className="flex  items-start mt-6 pl-4">
            <Text className="font-bold text-3xl">{eventData?.eventName}</Text>
            <Text className="my-4">{eventData?.eventName}</Text>
            <Text className="text-xl font-semibold">About</Text>
            <Text className="mt-2">{eventData?.eventAbout}</Text>
          </View>
        </View>
        <View className="p-8 pt-0">
          <View className="flex justify-center items-center mb-2">
            <Text className="mb-3 font-light mt-4">Timeline Event</Text>
            <View className="flex flex-row justify-between items-center px-8 h-10 w-80 bg-gray-400 rounded-2xl">
              <Text>Starting at</Text>
              <Text>{eventData?.date}</Text>
            </View>
          </View>
          <Box>
            <Button variant="solid" mt="$2" h="$12" rounded="$2xl">
              <ButtonText>Join the Event</ButtonText>
              <ButtonIcon
                as={ArrowRightIcon}
                ml="$4"
                fontSize="$2xl"
                fontWeight="$bold"
              />
            </Button>
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;
