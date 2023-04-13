import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";

import axios from "../api_inbusiness/axios";

const initialState = {
  user: {},
  permissions: [],
  accessToken: undefined,
  setAccessToken: () => {},
};

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const someData = {
    id: 18,
    idCounties: 1,
    lastName: "Florinel",
    memberId: null,
    firstName: "Florinel",
    email: "florinel+1@raisissoftware.com",
    phone: "0756767676",
    hash: "$2b$04$IDml8ghhMSl8rY/EOzLlV.p5.HYbONMmTaewnkmBp3jlApkeuWeNC",
    salt: null,
    img: "b6dc5696-9a49-4ce7-b333-8a4650e08891_filename.png",
    type: "activeMember",
    birthday: "1969-03-30T06:03:01.358Z",
    description: "string",
    companyName: "string",
    siteLink: null,
    companyDetails: "string",
    active: true,
    emailNotification: true,
    createdAt: "2023-03-30T06:03:36.428Z",
    isDeleted: false,
    Countie: {
      id: 1,
      code: "DJ",
      name: "Dolj",
      csmap: "ro18",
      createdAt: "2023-03-24T09:05:56.495Z",
      isDeleted: false,
    },
    Companies: [
      {
        id: 242,
        userId: 18,
        name: "John SRL",
        site: "www.site-ulmeu.com",
        logo: "01b86080-7d41-4170-a566-99a345ad2529_Screen Shot 2023-01-04 at 09.01.42.png",
        description: "Aceasta este firma mea, doar a mea, doar a mea",
        phone: "0789878987",
        isFavorite: false,
        createdAt: "2023-04-04T07:14:28.020Z",
        isDeleted: false,
      },
      {
        id: 240,
        userId: 18,
        name: "Test 1",
        site: "www.test1.com",
        logo: "f5bf04df-4d1a-4543-b9a2-b68a3cd38f7c_Romania_Harta_Gri.png",
        description: "descruerere",
        phone: "079878987",
        isFavorite: false,
        createdAt: "2023-04-03T10:37:56.085Z",
        isDeleted: false,
      },
      {
        id: 239,
        userId: 18,
        name: "Nu test",
        site: "www.NUtest.com",
        logo: "f80da12e-ece4-4ad4-b085-672707b30bdf_Screen Shot 2023-01-10 at 10.11.56.png",
        description: "descriere 2",
        phone: "0787987987",
        isFavorite: false,
        createdAt: "2023-04-03T10:37:35.294Z",
        isDeleted: false,
      },
      {
        id: 241,
        userId: 18,
        name: "Nume",
        site: "www.site.com",
        logo: "c46a88f2-6281-4197-a41f-1ee9b5662c9b_Screen Shot 2023-03-29 at 15.01.19.png",
        description: "nume descriere a",
        phone: "0798987987",
        isFavorite: false,
        createdAt: "2023-04-04T06:55:25.403Z",
        isDeleted: false,
      },
    ],
    Periods: [
      {
        id: 13,
        userId: 18,
        startDate: "2023-04-05T09:52:15.330Z",
        endDate: "2023-06-05T09:52:15.330Z",
        amount: 200,
        observation:
          "Payment with stripe, for period 2023-04-05T09:52:15.330Z - 2023-06-05T09:52:15.330Z.",
        paymentIntentId: "pi_3MtT0zLr8jVJ7xqX18Xrnyaa",
        createdAt: "2023-04-05T09:52:29.224Z",
        isDeleted: false,
      },
    ],
  };
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(someData);
  const [permissions, setPermissions] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const me = async () => {
    try {
      return someData;
    } catch (error) {
      return {};
    }
  };

  const getUpdatedUser = async () => {
    const refreshUser = await me();
    setUser(refreshUser);
  };

  const can = () => {
    return 1;
  };

  const handleAccessTokenChange = async () => {
    if (!user.id && accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common.Authorization = "Bearer " + accessToken;

      setLoadingUser(true);
      const user = await me();

      /**
       * [FIX]
       * We have to explicitly check if user has a role (only for older users)
       * There may be some users that do not have a roleId
       */

      setUser(user);
    } else if (!accessToken) {
      /**
       * Log out
       * Reset important values
       */
      localStorage.removeItem("accessToken");
      setUser({});
      setPermissions([]);
    }

    setLoadingUser(false);
  };

  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        accessToken,
        setAccessToken,
        can,
        getUpdatedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
