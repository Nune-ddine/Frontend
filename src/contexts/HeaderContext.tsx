import React, { createContext, useContext, useState, ReactNode } from 'react';

// 컨텍스트 타입 정의
interface HeaderContextType {
  reloadHeader: boolean;
  triggerReload: () => void;
}

// 컨텍스트 생성 및 초기값 설정
const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// HeaderProvider 컴포넌트 정의
interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [reloadHeader, setReloadHeader] = useState<boolean>(false);

  const triggerReload = () => {
    setReloadHeader(!reloadHeader);
  };

  return (
    <HeaderContext.Provider value={{ reloadHeader, triggerReload }}>
      {children}
    </HeaderContext.Provider>
  );
};

// useHeader 훅 정의
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader는 HeaderProvider 내에서만 사용될 수 있습니다.');
  }
  return context;
};
