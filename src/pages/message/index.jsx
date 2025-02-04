import './styles.css';
import InputWithError from './InputWithError ';
import ProfileImg from './ProfileImg';
import api from '../../api/axios';
import profilePreview from '../../assets/images/profile.svg';
import Select from './Select';
import { useEffect, useState } from 'react';

const Message = () => {
  const [sender, setSender] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [images, setImages] = useState([]);
  const [loadingError, setLoadingError] = useState(false);
  const [profileImg, setProfileImg] = useState(profilePreview);
  const [selected, setSelected] = useState('지인');

  const relationOptions = ['친구', '지인', '동료', '가족'];

  const handleInputChange = (e) => {
    setSender(e.target.value); // 공백 제거 후 상태 업데이트
    setIsValid(true);
  };

  // 예시 프로필 이미지 요청
  useEffect(() => {
    const getProfileImages = async () => {
      try {
        const response = await api.getProfileImages();
        setImages(response.data.imageUrls);
        setLoadingError(false);
      } catch (e) {
        setLoadingError(true);
      }
    };
    getProfileImages();
  }, []);

  return (
    <form className="container max-w-[720px] mx-auto mt-[112px] flex flex-col ">
      {/*sender 입력창*/}
      <label htmlFor="from-input" className="text-24-bold mb-3">
        From.
      </label>
      <InputWithError
        value={sender}
        onChange={handleInputChange}
        onBlur={() => sender === '' && setIsValid(false)}
        isValid={isValid}
      />

      {/*프로필 이미지*/}
      <label className="text-24-bold mt-[50px] mb-3">프로필 이미지</label>
      <ProfileImg
        images={images}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        loadingError={loadingError}
      />

      {/*상대와의 관계*/}
      <label className="text-24-bold mt-[50px] mb-3">상대와의 관계</label>
      <Select options={relationOptions} selected={selected} setSelected={setSelected} />
    </form>
  );
};

export default Message;
