const jwt = require('jsonwebtoken');

// 사용자 정보
const user = {
    id: 123,
    username: 'exampleUser',
    role: 'admin'
};

// JWT 생성 및 발급
const generateToken = () => {
    // JWT에 포함될 페이로드 설정 (사용자 정보)
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    // JWT 발급 및 서명
    const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' }); // 시크릿 키와 만료 시간 설정
    return token;
};

// JWT 검증
const verifyToken = (token) => {
    try {
        // JWT 검증
        const decoded = jwt.verify(token, 'secretKey');

        // 검증된 페이로드 반환
        return decoded;
    } catch (err) {
        // JWT가 유효하지 않은 경우 에러 처리
        console.error('Error verifying JWT:', err.message);
        return null;
    }
};

// 테스트
const token = generateToken();
console.log('Generated JWT:', token);

// 검증
const decodedToken = verifyToken(token);
if (decodedToken) {
    console.log('Decoded JWT:', decodedToken);
} else {
    console.log('JWT verification failed.');
}