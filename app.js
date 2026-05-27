const PETS_DATA = [
  {
    id: 1,
    name: "Vàng",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "false",
    vaccinated: false,
    neutered: false,
    fosterDays: 3,
    desc: "Hướng nội nên chỉ toàn chơi một mình, chủ yếu yêu thiên nhiên hòa mình vào cây cỏ. Tìm gia đình có không gian rộng và thiên nhiên.",
    tags: ["Nhút nhát"],
    bgColor: "#FFF0E8",
    costs: "320,000 VNĐ",
    image: "./img/vang.jpg.jpg"
  },
  {
    id: 2,
    name: "Mập",
    type: "cat",
    emoji: "🐱",
    age: "~6 tháng",
    location: "Khu A và F, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: true,
    neutered: false,
    fosterDays: 14,
    desc: "Cá thể mèo thượng đẳng, chỉ mới gia nhập trại mèo nhưng không ngán bất kỳ ai. Cô mèo say hi với loài người, hòa đồng với trẻ em và mèo. Tìm gia đình có không gian rộng.",
    tags: ["Thân thiện", "Hơi choảnh"],
    bgColor: "#E8F0FF",
    costs: "750,000 VNĐ",
    image: "./img/map.jpg.jpg"
  },
  {
    id: 3,
    name: "Bí",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Green coffee khu F, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: true,
    neutered: true,
    fosterDays: 7,
    desc: "Bí là một cô mèo rất hiền lành. Quyến rũ những ai cầm đồ ăn sáng và chơi đùa nhẹ nhàng. Phù hợp với người sống trong căn hộ nhỏ.",
    tags: ["Đã vaccine", "Siêu thân thiện", "Dễ nuôi"],
    bgColor: "#F0FFE8",
    costs: "1,100,000 VNĐ",
    image: "./img/bi.jpg.jpg"
  },
  {
    id: 4,
    name: "Tripod",
    type: "cat",
    emoji: "🐱",
    age: "~3 tháng",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Đực",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 5,
    desc: "Tripod được nhìn thấy tại KTX Cao đằng xây dựng nhưng vì một số lí do nên không được ở đó nữa. Hiện tại bé được chuyển về UTE để có nơi nương tựa. Bẩm sinh chỉ có 3 chân. Tìm gia đình có thể yêu thương, chăm sóc và quan tâm bé hơn xíu. Rất hiếu động và ham chơi.",
    tags: ["Siêu thân thiện", "Năng động"],
    bgColor: "#FFF8E0",
    costs: "150,000 VNĐ",
    image: "./img/tripod.jpg.jpg"
  },
  {
    id: 5,
    name: "Kiều",
    type: "cat",
    emoji: "😺",
    age: "~4 tháng",
    location: "Khu E, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: true,
    neutered: false,
    fosterDays: 20,
    desc: "Kiều đẹp nghiêng nước nghiêng thành nên lúc ẩn lúc hiện. Đã được tiêm vaccine mũi đầu. Cần nhà nuôi có kinh nghiệm với mèo.",
    tags: ["Đã vaccine 1 mũi", "Đẹp không chỗ chê", "Khá thân thiện"],
    bgColor: "#FFF0E8",
    costs: "450,000 VNĐ",
    image: "./img/kieu.jpg.jpg"
  },
  {
    id: 6,
    name: "Diễm",
    type: "cat",
    emoji: "🐈",
    age: "~8 tháng",
    location: " Xưởng in khu E, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 1,
    desc: "Hay xin ăn, chảnh thì thôi nhé cho ăn nhiều thì được sờ nhiều không cho thì chỉ thái độ. Cần tìm gia đình yêu mèo.",
    tags: ["Khá thân thiện", "Hay xin ăn"],
    bgColor: "#FFEAEA",
    costs: "0 VNĐ (mới)",
    image: "./img/diem.jpg.jpg"
  },
  {
    id: 7,
    name: "Mun",
    type: "dog",
    emoji: "🐩",
    age: "~4 năm",
    location: "Dĩ An, Bình Dương (gần HCM)",
    gender: "Cái",
    status: "safe",
    vaccinated: true,
    neutered: true,
    fosterDays: 30,
    desc: "Mun là chú chó trưởng thành rất điềm tĩnh. Đã triệt sản và tiêm đủ vaccine. Không sủa nhiều, thích ngủ và ăn. Phù hợp với người bận rộn.",
    tags: ["Đã vaccine", "Đã triệt sản", "Điềm tĩnh"],
    bgColor: "#E8FFF0",
    costs: "1,500,000 VNĐ",
    image: "./img/mun.jpg.jpg"
  },
  {
    id: 8,
    name: "Gấu",
    type: "dog",
    emoji: "🐩",
    age: "~6 tháng",
    location: "Lê Văn Việt, Tăng Nhơn Phú, TPHCM",
    gender: "Đực",
    status: "watch",
    vaccinated: true,
    neutered: false,
    fosterDays: 10,
    desc: "Gâu có bộ lông đen trắng giống bánh Oreo. Tính cách vui vẻ, hay sủa gâu gâu. Bị gia đình bỏ rơi, hiện tại đã được gia đình khác cưu mang tạm thời nhưng vẫn cần tìm chỗ mới. Đang chờ làm triệt sản. Người nhận nuôi cần ký cam kết triệt sản.",
    tags: ["Đã vaccine", "Chờ triệt sản", "Vui vẻ"],
    bgColor: "#F5E8FF",
    costs: "1,500,000 VNĐ",
    image: "./img/gau.jpg.jpg"
  },
  {
    id: 9,
    name: "A Lem",
    type: "cat",
    emoji: "🐱",
    age: "Lớn tuổi",
    location: "Khu A (gần cafe Ông Bầu), ĐH Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 0,
    desc: "Cái màu lông độc nhất vô nhị, chỉ lớn tuổi lắm rồi, chỉ thường độc chiếm khu gần cafe Ông Bầu ấy, nhìn mặt chỉ giang hồ thế thoi chứ chỉ hiền khô hà =)))",
    tags: ["Siêu thân thiện", "Giang hồ hiền lành"],
    bgColor: "#FFF0E8",
    costs: "0 VNĐ",
    image: "./img/alem.jpg.jpg"
  },
  {
    id: 10,
    name: "A Nhem",
    type: "cat",
    emoji: "😼",
    age: "~1 năm",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "watch",
    vaccinated: false,
    neutered: false,
    fosterDays: 0,
    desc: "Tưởng Mỹ Lem của Vitamin mèo từ Cần Thơ lên UTE đi học :)) chỉ ăn nhiều gào siuu lớn đặc biệt là không cho sờ. Chúng tôi những con người cho chỉ ăn và bị chỉ tặng cho những vết cào nồng cháy.",
    tags: ["Chảnh", "Không cho sờ"],
    bgColor: "#FFEAEA",
    costs: "0 VNĐ",
    image: "./img/anhem.jpg.jpg"
  },
  {
    id: 11,
    name: "Ba Ghẻ",
    type: "cat",
    emoji: "🐯",
    age: "~1 năm",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Đực",
    status: "watch",
    vaccinated: false,
    neutered: false,
    fosterDays: 5,
    desc: "Là em song sinh với Hai Khờ, để nhận biết ảnh thì nhìn vào màu lông, lông ảnh đậm hơn với có sọc vằn, y như cọp. Chắc đồng chị đồng em, thương nhau nên bệnh da liễu như nhau :((",
    tags: ["Siêu thân thiện", "Sọc cọp vằn"],
    bgColor: "#FFF8E0",
    costs: "0 VNĐ",
    image: "./img/baghe.jpg.jpg"
,  },
  {
    id: 12,
    name: "Bí",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Green coffee khu F",
    gender: "Bé gái",
    status: "safe", 
    vaccinated: false, 
    neutered: false,
    fosterDays: 14,
    desc: "Bí là một cô mèo rất hiền lành. Quyến rũ những ai cầm đồ ăn sáng và chơi đùa nhẹ nhàng với mọi người. Tuy nhiên chỉ hay bị viêm da.",
    tags: ["Thân thiện", "Hay bị viêm da"],
    bgColor: "#F0FFE8", 
    costs: "0 VNĐ",
    image: "./img/bi.jpg.jpg"
  },
  {
    id: 13,
    name: "Cá",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Bé gái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Nuôi từ bé, thân thiện, không kén ăn. Do hay lang thang ngoài đường nên người hơi dơ.",
    tags: ["Thân thiện", "Hơi dơ", "Đi bụi"],
    bgColor: "#E8F0FF",
    costs: "0 VNĐ",
    image: "./img/ca.jpg.jpg"
  },
  {
    id: 14,
    name: "Hai Khờ",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu A",
    gender: "Bé trai",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Là anh em sinh đôi với 3 ghẻ nhưng lông nhạt hơn với không có sọc vằn, tính lầm lầm lì lì, hơi quạo khi sờ, đang trị nấm rụng lông.",
    tags: ["Quạo", "Lầm lì"],
    bgColor: "#FFF8E0",
    costs: "0 VNĐ",
    image: "./img/haikho.jpg.jpg"
  },
  {
    id: 15,
    name: "Quạo",
    type: "cat",
    emoji: "😼",
    age: "~1 năm",
    location: "Căn tin khu A, D và F",
    gender: "Bé gái",
    status: "watch",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Khuôn mặt lúc nào cũng quạo, trùm ăn vụng, chuyên gia cắn trộm (nên cẩn thận), trùm giang hồ.",
    tags: ["Quạo", "Giang hồ", "Hay cắn trộm"],
    bgColor: "#FFEAEA",
    costs: "0 VNĐ",
    image: "./img/quao.jpg.jpg" 
  },
  {
    id: 16,
    name: "Bầu",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu F",
    gender: "Bé gái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Bé hay ở trong KTX CĐ Xây dựng thỉnh thoảng qua UTE dạo mát, đã có bầu và đang sinh con, tính tình hiện tại rất hiền.",
    tags: ["Hiền lành", "Đang nuôi con"],
    bgColor: "#FFF0E8",
    costs: "0 VNĐ",
    image: "./img/bau.jpg.jpg"
  },
  {
    id: 17,
    name: "Đốm",
    type: "cat",
    emoji: "🐱",
    age: "~2 năm",
    location: "Khu D và F",
    gender: "Bé gái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Đốm có bộ lông đen trắng nhìn mặt khá hài, bé béo ụt ịt, tính tình lầm lì nhưng ít quạo, không kén ăn.",
    tags: ["Lầm lì", "Béo ụt ịt"],
    bgColor: "#E8F0FF",
    costs: "0 VNĐ",
    image: "./img/dom.jpg.jpg"
  },
  {
    id: 18,
    name: "Koi",
    type: "cat",
    emoji: "🐱",
    age: "~2 năm",
    location: "Khu F (nhà vệ sinh nam)",
    gender: "Bé trai",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Sở hữu bộ lông y hệt cá Koi nên thường được gọi là Koi, hay kêu réo vì đòi ăn, rất thích bế và sờ, không sợ người nhưng sợ chó.",
    tags: ["Thích bế", "Sợ chó", "Hay kêu"],
    bgColor: "#F0FFE8",
    costs: "0 VNĐ",
    image: "./img/koi.jpg.jpg"
  },
  {
    id: 19,
    name: "Mướp",
    type: "cat",
    emoji: "🐱",
    age: "~2 năm",
    location: "Khu F",
    gender: "Bé trai",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14
    ,
    desc: "Chỉ lầm lầm lì lì, hơi quạo không cho bế, thân với chó.",
    tags: ["Quạo", "Thân với chó"],
    bgColor: "#FFF8E0",
    costs: "0 VNĐ",
    image: "./img/muop.jpg.jpg"
  },
  {
    id: 20,
    name: "Mỹ Diệu",
    type: "cat",
    emoji: "🐱",
    age: "~2 năm",
    location: "Khu F",
    gender: "Bé gái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Mỹ Diệu với cái tính nết không lẫn đi đâu được, tướng ngồi lủng tường y chang bản gốc, đã béo nhưng lúc nào cũng đòi ăn, hay quạo với mèo khác.",
    tags: ["Hay quạo", "Đòi ăn", "Ngồi lủng tường"],
    bgColor: "#FFF0E8",
    costs: "0 VNĐ",
    image: "./img/mydieu.jpg.jpg"
  },
  {
    id: 21,
    name: "Trắng",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu E",
    gender: "Bé gái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Là đứa con gái út trong gia đình có 4 anh chị em, tính tình rất nhút nhát và sợ người.",
    tags: ["Nhút nhát", "Sợ người"],
    bgColor: "#E8F0FF",
    costs: "0 VNĐ",
    image: "./img/trang.jpg.jpg"
  },
  {
    id: 21,
    name: "Út Cọp",
    type: "cat",
    emoji: "🐯",
    age: "~6 tháng",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Đực",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Bé Út Cọp siêu cấp đáng yêu với bộ lông vằn như một chú hổ con. Tính cách năng động, thích chạy nhảy tinh nghịch và rất quấn quýt các bạn sinh viên.",
    tags: ["Năng động", "Sọc cọp vằn", "Quấn người"],
    bgColor: "#FFF8E0",
    costs: "0 VNĐ",
    image: "./img/utcop.jpg.jpg"
  },
  {
    id: 22,
    name: "Vịt",
    type: "cat",
    emoji: "🐱",
    age: "~1 năm",
    location: "Khu A, Đại học Công Nghệ Kỹ Thuật TPHCM.",
    gender: "Cái",
    status: "safe",
    vaccinated: false,
    neutered: false,
    fosterDays: 14,
    desc: "Tên Vịt nhưng lại là mèo! Bé có dáng đi lạch bạch vô cùng dễ thương, tính tình thân thiện, khoái đi theo chân mọi người để nịnh bợ xin ăn.",
    tags: ["Dễ thương", "Thân thiện", "Hay bám đuôi"],
    bgColor: "#FFF0E8",
    costs: "0 VNĐ",
    image: "./img/vit.jpg.jpg"
  }
];
const MERCH_DATA = [
  {
    id: 1,
    name: "Áo Phông PAWGEN Classic",
    type: "apparel",
    emoji: "👕",
    price: 250000,
    desc: "Unisex, cotton 100%, in lưới cao cấp. Màu kem & xanh rừng.",
    badge: "Bán chạy nhất",
    bgColor: "#E8F0FF",
  },
  {
    id: 2,
    name: "Hoodie Cứu Hộ Hero",
    type: "apparel",
    emoji: "🧥",
    price: 480000,
    desc: "Nỉ ấm, có túi kangaroo. In slogan 'Rescue. Foster. Adopt.'",
    badge: "New",
    bgColor: "#FFF0E8",
  },
  {
    id: 3,
    name: "Tote Bag PawPrint",
    type: "accessory",
    emoji: "👜",
    price: 150000,
    desc: "Canvas dày, 2 quai chắc. In dấu chân thú cưng nghệ thuật.",
    badge: "Eco",
    bgColor: "#E8FFE8",
  },
  {
    id: 4,
    name: "Bộ Sticker PAWGEN Vol.1",
    type: "sticker",
    emoji: "🎨",
    price: 45000,
    desc: "12 sticker chống nước. Thiết kế chibi mèo chó cute.",
    badge: "45K",
    bgColor: "#FFF8E0",
  },
  {
    id: 5,
    name: "Mug Terracotta Cat",
    type: "homeware",
    emoji: "☕",
    price: 180000,
    desc: "Sứ cao cấp 350ml. Họa tiết mèo thủ công trên nền đất nung.",
    badge: null,
    bgColor: "#FFE8E8",
  },
  {
    id: 6,
    name: "Nón Bucket PAWGEN",
    type: "apparel",
    emoji: "🧢",
    price: 220000,
    desc: "Chất liệu chống nắng tốt. Thêu logo PAWGEN 3D.",
    badge: "Limited",
    bgColor: "#E8F5FF",
  },
  {
    id: 7,
    name: "Keychain Paw Charm",
    type: "accessory",
    emoji: "🔑",
    price: 65000,
    desc: "Hợp kim kẽm mạ vàng. Dấu chân thú cưng siêu cute.",
    badge: null,
    bgColor: "#F5E8FF",
  },
  {
    id: 8,
    name: "Gối Tựa Lưng Mochi",
    type: "homeware",
    emoji: "🛋️",
    price: 320000,
    desc: "Gối bông cao su non. In hình Mochi — mèo được cứu hộ đầu tiên của PAWGEN.",
    badge: "Story",
    bgColor: "#E8FFF5",
  },
  {
    id: 9,
    name: "Poster Art 'Every Life Counts'",
    type: "sticker",
    emoji: "🖼️",
    price: 95000,
    desc: "A3, in decal cao cấp không thấm nước. Thiết kế tranh nghệ thuật.",
    badge: null,
    bgColor: "#FFF0F5",
  },
];

const DONORS_DATA = [
  {
    name: "Minh Anh N.",
    avatar: "🌸",
    case: "Quỹ thú y chung",
    amount: "500,000đ",
    time: "5 phút trước",
  },
  {
    name: "Trường H.",
    avatar: "🌟",
    case: "Cứu hộ Luna",
    amount: "200,000đ",
    time: "12 phút trước",
  },
  {
    name: "Phương L.",
    avatar: "🎀",
    case: "Quỹ thức ăn",
    amount: "100,000đ",
    time: "28 phút trước",
  },
  {
    name: "Anonymous",
    avatar: "🐾",
    case: "Bất kỳ case cần nhất",
    amount: "1,000,000đ",
    time: "1 giờ trước",
  },
  {
    name: "Khoa B.",
    avatar: "⭐",
    case: "Cứu hộ Mochi",
    amount: "150,000đ",
    time: "2 giờ trước",
  },
];

const CASES_DATA = [
  {
    id: "PL-001",
    pet: "🐱 Mochi",
    location: "ĐH Bách Khoa",
    reporter: "Sinh viên K20",
    status: "urgent",
    step: "Điều trị thú y",
    time: "2 giờ trước",
  },
  {
    id: "PL-002",
    pet: "🐶 Bông",
    location: "Nguyễn Trãi Q.5",
    reporter: "Linh T.",
    status: "green",
    step: "Chờ nhận nuôi",
    time: "1 ngày trước",
  },
  {
    id: "PL-003",
    pet: "🐱 Luna",
    location: "ĐH Kinh Tế",
    reporter: "Hùng P.",
    status: "urgent",
    step: "Chờ vận chuyển",
    time: "30 phút trước",
  },
  {
    id: "PL-004",
    pet: "🐕 Caramel",
    location: "Tao Đàn Q.1",
    reporter: "Mai N.",
    status: "yellow",
    step: "Nuôi tạm",
    time: "3 ngày trước",
  },
  {
    id: "PL-005",
    pet: "😺 Tàu Hũ",
    location: "Chợ Bến Thành",
    reporter: "Hà P.",
    status: "blue",
    step: "Đã có người nhận",
    time: "5 ngày trước",
  },
  {
    id: "PL-006",
    pet: "🐈 Pudding",
    location: "ĐHQG Thủ Đức",
    reporter: "Khoa B.",
    status: "yellow",
    step: "Nuôi tạm",
    time: "1 tuần trước",
  },
];

const FOSTERS_DATA = [
  {
    name: "Nguyễn Minh Anh",
    area: "Quận 10",
    type: "Mèo",
    rating: 5,
    current: 1,
    max: 2,
    avatar: "🌸",
  },
  {
    name: "Trần Hoàng Hùng",
    area: "Thủ Đức",
    type: "Chó + Mèo",
    rating: 5,
    current: 0,
    max: 1,
    avatar: "🌟",
  },
  {
    name: "Lê Phương Linh",
    area: "Quận 3",
    type: "Mèo",
    rating: 4,
    current: 2,
    max: 2,
    avatar: "🎀",
  },
  {
    name: "Phạm Văn Khoa",
    area: "Bình Thạnh",
    type: "Chó",
    rating: 5,
    current: 1,
    max: 3,
    avatar: "⭐",
  },
  {
    name: "Võ Thị Mai",
    area: "Quận 7",
    type: "Mèo",
    rating: 4,
    current: 0,
    max: 2,
    avatar: "🌺",
  },
];

// Cart state
let cart = [];
let currentFilter = "all";
let currentMerchFilter = "all";
let currentDashTab = "overview";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavAuth();
  initFloatingPaws();
  initCounters();
  initPetsGrid();
  initMerchGrid();
  initDonors();
  initDashboard();
  initForms();
  initFilterBtns();
  initMerchFilterBtns();
  initDashTabs();
  initDonateAmounts();
  initUploadZone();
  initMobileMenu();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    // Active link
    const sections = [
      "hero",
      "adopt",
      "rescue",
      "foster",
      "volunteer",
      "dashboard",
      "donate",
      "merch",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        links.forEach((l) => l.classList.remove("active"));
        const activeLink = document.querySelector(`[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
  mobileClose.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// ===== FLOATING PAWS =====
function initFloatingPaws() {
  const container = document.getElementById("floatingPaws");
  const paws = ["🐾", "🐱", "🐶", "❤️", "🐾"];

  for (let i = 0; i < 12; i++) {
    const paw = document.createElement("div");
    paw.classList.add("floating-paw");
    paw.textContent = paws[Math.floor(Math.random() * paws.length)];
    paw.style.left = `${Math.random() * 100}%`;
    paw.style.animationDuration = `${8 + Math.random() * 12}s`;
    paw.style.animationDelay = `${Math.random() * 15}s`;
    paw.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    container.appendChild(paw);
  }
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = Date.now();

  const tick = () => {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

// ===== SCROLL UTIL =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===== PETS GRID =====
function initPetsGrid() {
  // Đọc thú cưng từ admin (key "pawlink_pets") — override nếu đã có, thêm nếu mới
  try {
    const adminPets = JSON.parse(localStorage.getItem("pawlink_pets") || "[]");
    if (adminPets.length > 0) {
      adminPets.forEach((p) => {
        const idx = PETS_DATA.findIndex(
          (existing) => Number(existing.id) === Number(p.id),
        );
        if (idx !== -1) {
          PETS_DATA[idx] = p; // cập nhật pet đã có
        } else {
          PETS_DATA.push(p); // thêm pet mới do admin tạo
        }
      });
    }
  } catch (e) {}
  renderPets("all");
}

function renderPets(filter) {
  const grid = document.getElementById("petsGrid");
  let pets = PETS_DATA;

  if (filter === "cat") pets = pets.filter((p) => p.type === "cat");
  else if (filter === "dog") pets = pets.filter((p) => p.type === "dog");
  else if (filter === "urgent")
    pets = pets.filter((p) => p.status === "urgent");
  else if (filter === "vaccinated") pets = pets.filter((p) => p.vaccinated);

  grid.innerHTML = pets
    .map(
      (p) => `
    <div class="pet-adopt-card" onclick="openPetModal(${p.id})">
      <div class="pet-adopt-img" style="background:${p.bgColor}; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            ${p.image ? 
              `<img src="${p.image}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">` 
              : `<span>${p.emoji}</span>`
            }
        <span class="tag tag-${p.status === "urgent" ? "urgent" : p.status === "watch" ? "watch" : "safe"}" style="position:absolute;top:12px;left:12px">
          ${p.status === "urgent" ? "🔴 Cần gấp" : p.status === "watch" ? "🟡 Theo dõi" : "🟢 An toàn"}
        </span>
      </div>
      <div class="pet-adopt-body">
        <div class="pet-adopt-name">${p.name}</div>
        <div class="pet-adopt-meta">${p.gender} · ${p.age} · ${p.location}</div>
        <div class="pet-adopt-tags">
          ${p.tags.map((t) => `<span class="pet-tag">${t}</span>`).join("")}
        </div>
        <div class="pet-adopt-footer">
          <span class="pet-foster-time">Nuôi tạm: ${p.fosterDays} ngày</span>
          <button class="btn-primary" style="padding:0.4rem 0.85rem;font-size:0.8rem" onclick="event.stopPropagation();openPetModal(${p.id})">Xem chi tiết</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function initFilterBtns() {
  document.querySelectorAll(".filter-btn[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn[data-filter]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderPets(currentFilter);
    });
  });
}

function showMorePets() {
  showToast("🐾 Hiện đã hiển thị tất cả thú cưng đang cần nhận nuôi!");
}

// ===== PET MODAL =====
function openPetModal(id) {
  const pet = PETS_DATA.find((p) => p.id === id);
  if (!pet) return;

  document.getElementById("petModalContent").innerHTML = `
    <div class="pet-modal-grid">
      <div>
       <div class="pet-modal-img" style="background:${pet.bgColor}; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      ${pet.image ? '<img src="' + pet.image + '" style="width: 100%; height: 100%; object-fit: contain;">' : pet.emoji}
        </div>
      </div>
      <div class="pet-modal-info">
        <div class="pet-modal-tags">
          <span class="tag tag-${pet.status === "urgent" ? "urgent" : pet.status === "watch" ? "watch" : "safe"}">
            ${pet.status === "urgent" ? "🔴 Cần gấp" : pet.status === "watch" ? "🟡 Theo dõi" : "🟢 An toàn"}
          </span>
          ${pet.vaccinated ? '<span class="pet-tag">💉 Đã vaccine</span>' : '<span class="pet-tag">Chưa vaccine</span>'}
          ${pet.neutered ? '<span class="pet-tag">✂️ Đã triệt sản</span>' : ""}
        </div>
        <h2 class="pet-adopt-name" style="font-size:2rem">${pet.name}</h2>
        <div class="pet-adopt-meta" style="margin-bottom:1rem">${pet.gender} · ${pet.age} · ${pet.location}</div>
        <p class="pet-modal-desc">${pet.desc}</p>
        <div class="pet-modal-stats">
          <div class="pet-stat"><div class="pet-stat-label">Thời gian nuôi tạm</div><div class="pet-stat-val">${pet.fosterDays} ngày</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Chi phí đã dùng</div><div class="pet-stat-val">${pet.costs}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Loài</div><div class="pet-stat-val">${pet.type === "cat" ? "🐱 Mèo" : "🐶 Chó"}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Giới tính</div><div class="pet-stat-val">${pet.gender}</div></div>
        </div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <button class="btn-primary" onclick="handleAdopt('${pet.name}')">❤️ Đăng ký nhận nuôi</button>
          <button class="btn-outline" onclick="handleDonate('${pet.name}')">💝 Donate cho ${pet.name}</button>
        </div>
      </div>
    </div>
  `;

  openModal("petModal");
}

function handleAdopt(name) {
  closeModal("petModal");
  showToast(
    `✅ Đăng ký nhận nuôi ${name} thành công! Chúng mình sẽ liên hệ bạn trong 24h.`,
  );
}

function handleDonate(name) {
  closeModal("petModal");
  scrollToSection("donate");
  showToast(`💝 Hãy donate để giúp ${name} nhé!`);
}

// ===== MERCH =====
function initMerchGrid() {
  renderMerch("all");
}

function renderMerch(filter) {
  const grid = document.getElementById("merchGrid");

  // Đọc merch từ admin localStorage, fallback về MERCH_DATA cứng
  let allMerch = MERCH_DATA;
  try {
    const adminMerch = JSON.parse(
      localStorage.getItem("pawgen_merch") || "null",
    );
    if (adminMerch && adminMerch.length > 0) allMerch = adminMerch;
  } catch (e) {}

  let items = allMerch;
  if (filter !== "all") items = items.filter((m) => m.type === filter);

  grid.innerHTML = items
    .map(
      (m) => `
    <div class="merch-card">
      <div class="merch-img" style="background:${m.bgColor}">
        <span>${m.emoji}</span>
        ${m.badge ? `<span class="merch-badge">${m.badge}</span>` : ""}
      </div>
      <div class="merch-body">
        <div class="merch-name">${m.name}</div>
        <div class="merch-sub">${m.desc}</div>
        <div class="merch-footer">
          <span class="merch-price">${formatPrice(m.price)}</span>
          <button class="btn-add-cart" onclick="addToCart(${m.id})">🛒 Thêm</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function initMerchFilterBtns() {
  document.querySelectorAll(".filter-btn[data-mfilter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn[data-mfilter]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentMerchFilter = btn.dataset.mfilter;
      renderMerch(currentMerchFilter);
    });
  });
}

// ===== CART =====
function addToCart(id) {
  let allMerch = MERCH_DATA;
  try {
    const adminMerch = JSON.parse(
      localStorage.getItem("pawgen_merch") || "null",
    );
    if (adminMerch && adminMerch.length > 0) allMerch = adminMerch;
  } catch (e) {}
  const item = allMerch.find((m) => Number(m.id) === Number(id));
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });

  updateCartFloat();
  showToast(`🛒 Đã thêm "${item.name}" vào giỏ!`);
}

function updateCartFloat() {
  const cartFloat = document.getElementById("cartFloat");
  const cartCount = document.getElementById("cartCount");
  const total = cart.reduce((s, c) => s + c.qty, 0);

  if (total > 0) {
    cartFloat.style.display = "flex";
    cartCount.textContent = total;
  } else {
    cartFloat.style.display = "none";
  }
}

function openCart() {
  const content = document.getElementById("cartContent");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    content.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--mid-gray)">🛒 Giỏ hàng trống<br/>Hãy chọn một vài món từ Merch Shop nhé!</div>`;
    footer.innerHTML = "";
  } else {
    content.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)} / cái</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span style="font-family:var(--font-mono);font-weight:700">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
        </div>
        <div style="font-family:var(--font-mono);font-weight:700;color:var(--terracotta);min-width:80px;text-align:right">
          ${formatPrice(item.price * item.qty)}
        </div>
      </div>
    `,
      )
      .join("");

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const donate30 = Math.round(total * 0.3);

    footer.innerHTML = `
      <div class="cart-total">
        <span>Tổng cộng</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-note">🌿 ${formatPrice(donate30)} (30%) sẽ vào quỹ cứu hộ PAWGEN</div>
      <button class="btn-primary w-full" onclick="checkout()">Thanh toán ngay →</button>
      <button class="btn-outline w-full" style="margin-top:0.5rem" onclick="closeModal('cartModal')">Tiếp tục mua sắm</button>
    `;
  }

  openModal("cartModal");
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  updateCartFloat();
  openCart(); // re-render
}

function checkout() {
  cart = [];
  updateCartFloat();
  closeModal("cartModal");
  showToast("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ PAWGEN!");
}

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " VNĐ";
}

// ===== DONORS =====
function initDonors() {
  const list = document.getElementById("donorList");
  list.innerHTML = DONORS_DATA.map(
    (d) => `
    <div class="donor-item">
      <div class="donor-avatar">${d.avatar}</div>
      <div class="donor-info">
        <div class="donor-name">${d.name}</div>
        <div class="donor-case">${d.case} · ${d.time}</div>
      </div>
      <div class="donor-amount">${d.amount}</div>
    </div>
  `,
  ).join("");
}

// ===== DONATE AMOUNTS =====
function initDonateAmounts() {
  const btns = document.querySelectorAll(".donate-amt");
  const impact = document.getElementById("donateImpact");
  const customInput = document.getElementById("customDonate");

  const impactMap = {
    2000: "1 gói thức ăn nhỏ",
    5000: "Sữa cho mèo con 1 ngày",
    20000: "Thức ăn 2 ngày",
    50000: "1 buổi khám thú y",
    100000: "1 liều vaccine cơ bản",
    200000: "Thức ăn cho 1 tuần nuôi tạm",
    500000: "1 ca phẫu thuật nhỏ",
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      customInput.value = "";
      const amt = parseInt(btn.dataset.amt);
      impact.innerHTML = `✨ ${formatPrice(amt)} = ${impactMap[amt] || "Hỗ trợ cứu hộ"}`;
    });
  });

  customInput.addEventListener("input", () => {
    btns.forEach((b) => b.classList.remove("active"));
    const val = parseInt(customInput.value) || 0;
    if (val > 0) {
      impact.innerHTML = `✨ ${formatPrice(val)} = Cảm ơn tấm lòng của bạn! 💝`;
    }
  });

  document.getElementById("donateBtn").addEventListener("click", () => {
    const activeBtn = document.querySelector(".donate-amt.active");
    const customVal = parseInt(customInput.value);
    const amt = customVal || (activeBtn ? parseInt(activeBtn.dataset.amt) : 0);

    if (!amt) {
      showToast("⚠️ Vui lòng chọn hoặc nhập số tiền donate!");
      return;
    }

    openDonateQRModal(amt);
  });
}

// ===== DONATE QR MODAL =====
function openDonateQRModal(amt) {
  // ===== CẬP NHẬT THÔNG TIN NGÂN HÀNG TẠI ĐÂY =====
  const BANK_NAME = "TechcomBank";
  const BANK_CODE = "TCB";
  const ACCOUNT_NO = "19075401204017";
  const ACCOUNT_NAME = "QUY CUU HO PAWGEN";
  // =====================================================
  const content = `Donate PAWGEN ${amt}`;

  // VietQR URL (chuẩn Napas/VietQR)
  const vietQRUrl = `https://img.vietqr.io/image/${BANK_CODE}-${ACCOUNT_NO}-compact2.png?amount=${amt}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  // Inject modal vào body nếu chưa có
  let modal = document.getElementById("donateQRModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "donateQRModal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal" style="max-width:420px;text-align:center;padding:2rem">
        <button class="modal-close" onclick="closeModal('donateQRModal')" style="position:absolute;top:1rem;right:1rem">✕</button>
        <div style="font-size:2.5rem;margin-bottom:0.5rem">💝</div>
        <h3 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:0.25rem">Quét để donate</h3>
        <p id="dqrAmt" style="color:var(--terracotta);font-size:1.6rem;font-weight:900;font-family:var(--font-display);margin-bottom:1rem"></p>

        <div style="background:var(--cream);border-radius:var(--radius-md);padding:1.25rem;margin-bottom:1rem">
          <img id="dqrImg" src="" alt="QR Code donate" style="width:200px;height:200px;margin:0 auto;border-radius:12px;display:block;border:3px solid var(--white);box-shadow:var(--shadow-sm)"/>
          <div id="dqrLoading" style="width:200px;height:200px;margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:2rem;display:none">⏳</div>
        </div>

        <div style="background:var(--cream-2);border-radius:var(--radius-sm);padding:0.875rem;text-align:left;font-size:0.82rem;line-height:1.8;margin-bottom:1.25rem">
          <div>🏦 <strong>Ngân hàng:</strong> ${BANK_NAME}</div>
          <div>💳 <strong>Số tài khoản:</strong> <span style="font-family:var(--font-mono);font-weight:700">${ACCOUNT_NO}</span></div>
          <div>👤 <strong>Chủ tài khoản:</strong> ${ACCOUNT_NAME}</div>
          <div id="dqrMsgLine">📝 <strong>Nội dung CK:</strong> <span style="font-family:var(--font-mono)" id="dqrMsg"></span></div>
        </div>

        <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
          <button onclick="copyDonateInfo()" style="padding:0.6rem 1.2rem;background:var(--forest);color:#fff;border:none;border-radius:var(--radius-sm);cursor:pointer;font-family:var(--font-body);font-weight:600;font-size:0.85rem">📋 Sao chép TK</button>
          <button onclick="closeModal('donateQRModal')" style="padding:0.6rem 1.2rem;background:var(--cream-2);color:var(--charcoal);border:none;border-radius:var(--radius-sm);cursor:pointer;font-family:var(--font-body);font-weight:600;font-size:0.85rem">Đóng</button>
        </div>
        <p style="font-size:0.72rem;color:var(--mid-gray);margin-top:1rem">✅ 100% số tiền vào quỹ cứu hộ PAWGEN. Cảm ơn bạn rất nhiều! 🐾</p>
      </div>
    `;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal("donateQRModal");
    });
    document.body.appendChild(modal);
  }

  // Update content
  document.getElementById("dqrAmt").textContent = formatPrice(amt);
  document.getElementById("dqrMsg").textContent = content;
  const img = document.getElementById("dqrImg");
  img.style.display = "none";
  imxg.src = "img/qr.jpg";
  img.onload = () => {
    img.style.display = "block";
  };
  img.onerror = () => {
    img.style.display = "none";
    img.insertAdjacentHTML(
      "afterend",
      `<div style="padding:1rem;color:var(--mid-gray);font-size:0.82rem">⚠️ Không tải được QR. Vui lòng chuyển khoản theo thông tin bên dưới.</div>`,
    );
  };

  // store for copy
  modal._accountNo = ACCOUNT_NO;
  modal._accountName = ACCOUNT_NAME;
  modal._content = content;

  openModal("donateQRModal");
}

window.copyDonateInfo = function () {
  const modal = document.getElementById("donateQRModal");
  const text = `Ngân hàng: MB Bank\nSố TK: ${modal._accountNo}\nChủ TK: ${modal._accountName}\nNội dung: ${modal._content}`;
  navigator.clipboard.writeText(text).then(
    () => showToast("✅ Đã sao chép thông tin chuyển khoản!"),
    () => showToast(`STK: ${modal._accountNo}`),
  );
};

// ===== DASHBOARD =====
function initDashboard() {
  renderDashboard("overview");
}

function initDashTabs() {
  document.querySelectorAll(".dash-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".dash-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentDashTab = tab.dataset.tab;
      renderDashboard(currentDashTab);
    });
  });
}

function renderDashboard(tab) {
  const content = document.getElementById("dashboardContent");

  if (tab === "overview") {
    content.innerHTML = `
      <div class="dash-overview-grid">
        <div class="dash-metric">
          <span class="dash-metric-val">23</span>
          <span class="dash-metric-label">Cases đang xử lý</span>
          <div class="dash-metric-change">↑ 5 case mới hôm nay</div>
        </div>
        <div class="dash-metric" style="border-left-color:var(--gold)">
          <span class="dash-metric-val" style="color:var(--gold)">47</span>
          <span class="dash-metric-label">Foster đang hoạt động</span>
          <div class="dash-metric-change">↑ 3 người mới tuần này</div>
        </div>
        <div class="dash-metric" style="border-left-color:var(--forest-light)">
          <span class="dash-metric-val" style="color:var(--forest-light)">312</span>
          <span class="dash-metric-label">Thú đã nhận nuôi (tháng)</span>
          <div class="dash-metric-change">↑ 18% so với tháng trước</div>
        </div>
        <div class="dash-metric" style="border-left-color:#4D96FF">
          <span class="dash-metric-val" style="color:#4D96FF">47.2M</span>
          <span class="dash-metric-label">Quỹ donate (VNĐ)</span>
          <div class="dash-metric-change">↑ 8.3M tuần này</div>
        </div>
      </div>
      <div class="dash-chart-area">
        <div class="dash-chart-box">
          <h4>📊 Số ca cứu hộ theo tháng</h4>
          <div class="bar-chart">
            ${[
              { m: "T1", v: 28 },
              { m: "T2", v: 35 },
              { m: "T3", v: 42 },
              { m: "T4", v: 38 },
              { m: "T5", v: 55 },
              { m: "T6", v: 48 },
              { m: "T7", v: 62 },
              { m: "T8", v: 71 },
              { m: "T9", v: 59 },
              { m: "T10", v: 78 },
              { m: "T11", v: 84 },
              { m: "T12", v: 91 },
            ]
              .map(
                (b) => `
              <div class="bar-group">
                <div class="bar" style="height:${(b.v / 91) * 100}%" title="${b.v} ca"></div>
                <span class="bar-label">${b.m}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        <div class="dash-chart-box">
          <h4>🥧 Phân loại động vật</h4>
          <div class="donut-placeholder"></div>
          <div class="dash-legend">
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--terracotta)"></span>Mèo (45%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--gold)"></span>Chó (25%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--forest-light)"></span>Đã nhận nuôi (15%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--light-gray)"></span>Khác (15%)</div>
          </div>
        </div>
      </div>
    `;
  } else if (tab === "cases") {
    content.innerHTML = `
      <div style="overflow-x:auto">
        <table class="cases-table">
          <thead>
            <tr>
              <th>Mã case</th>
              <th>Thú cưng</th>
              <th>Vị trí</th>
              <th>Người báo</th>
              <th>Trạng thái</th>
              <th>Bước hiện tại</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            ${CASES_DATA.map(
              (c) => `
              <tr>
                <td><span style="font-family:var(--font-mono);font-size:0.8rem">${c.id}</span></td>
                <td>${c.pet}</td>
                <td style="font-size:0.82rem;color:var(--mid-gray)">${c.location}</td>
                <td style="font-size:0.82rem">${c.reporter}</td>
                <td>
                  <span class="status-badge status-${c.status === "urgent" ? "red" : c.status === "yellow" ? "yellow" : c.status === "blue" ? "blue" : "green"}">
                    ${c.status === "urgent" ? "🔴 Khẩn cấp" : c.status === "yellow" ? "🟡 Theo dõi" : c.status === "blue" ? "🔵 Hoàn tất" : "🟢 Ổn định"}
                  </span>
                </td>
                <td style="font-size:0.82rem">${c.step}</td>
                <td style="font-size:0.78rem;color:var(--mid-gray)">${c.time}</td>
                <td>
                  <button onclick="showToast('📋 Xem chi tiết case ${c.id}')" style="padding:0.3rem 0.7rem;background:var(--terracotta);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.75rem;font-family:var(--font-body)">Xem</button>
                </td>
              </tr>
            `,
            ).join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === "fosters") {
    content.innerHTML = `
      <div class="pets-grid">
        ${FOSTERS_DATA.map(
          (f) => `
          <div class="foster-card" style="text-align:left">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
              <div style="width:48px;height:48px;border-radius:50%;background:var(--cream-2);display:flex;align-items:center;justify-content:center;font-size:1.5rem">${f.avatar}</div>
              <div>
                <div style="font-weight:700">${f.name}</div>
                <div style="font-size:0.78rem;color:var(--mid-gray)">${f.area} · Nuôi: ${f.type}</div>
              </div>
              <div style="margin-left:auto;font-family:var(--font-mono);font-size:0.75rem;color:var(--gold)">⭐ ${f.rating}/5</div>
            </div>
            <div style="background:var(--cream);border-radius:8px;padding:0.75rem;margin-bottom:1rem">
              <div style="font-size:0.78rem;color:var(--mid-gray);margin-bottom:0.25rem">Sức chứa hiện tại</div>
              <div style="display:flex;gap:0.35rem">
                ${Array.from({ length: f.max })
                  .map(
                    (_, i) =>
                      `<div style="width:24px;height:24px;border-radius:50%;background:${i < f.current ? "var(--terracotta)" : "var(--light-gray)"};display:flex;align-items:center;justify-content:center;font-size:0.8rem">${i < f.current ? "🐾" : ""}</div>`,
                  )
                  .join("")}
              </div>
              <div style="font-size:0.78rem;margin-top:0.25rem">${f.current}/${f.max} chỗ đang dùng</div>
            </div>
            <button onclick="showToast('📞 Liên hệ ${f.name} để giao thú cưng!')" class="btn-outline" style="width:100%;justify-content:center;padding:0.5rem;font-size:0.82rem">Liên hệ foster</button>
          </div>
        `,
        ).join("")}
      </div>
    `;
  } else if (tab === "campus") {
    content.innerHTML = `
      <div style="background:var(--cream);border-radius:var(--radius-md);padding:3rem;text-align:center">
        <div style="font-size:4rem;margin-bottom:1rem">🗺️</div>
        <h3 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.75rem">Bản đồ Campus</h3>
        <p style="color:var(--mid-gray);margin-bottom:2rem">Hiển thị phân bổ động vật bị bỏ rơi tại các trường đại học đối tác.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:600px;margin:0 auto">
          ${[
            { uni: "ĐH Bách Khoa", count: 8, color: "var(--red-urgent)" },
            { uni: "ĐH KHTN", count: 3, color: "var(--yellow-watch)" },
            { uni: "ĐH Kinh Tế", count: 5, color: "var(--red-urgent)" },
            { uni: "ĐH Sư Phạm", count: 2, color: "var(--green-safe)" },
            { uni: "ĐHQG Thủ Đức", count: 11, color: "var(--red-urgent)" },
            { uni: "ĐH Văn Lang", count: 1, color: "var(--green-safe)" },
          ]
            .map(
              (u) => `
            <div style="background:var(--white);border-radius:var(--radius-sm);padding:1rem;border-left:4px solid ${u.color}">
              <div style="font-size:0.8rem;font-weight:700;margin-bottom:0.25rem">${u.uni}</div>
              <div style="font-size:1.5rem;font-weight:900;font-family:var(--font-display);color:${u.color}">${u.count}</div>
              <div style="font-size:0.7rem;color:var(--mid-gray)">case đang xử lý</div>
            </div>
          `,
            )
            .join("")}
        </div>
        <button onclick="showToast('🗺️ Tính năng bản đồ interactive đang phát triển!')" class="btn-primary" style="margin-top:2rem">Mở bản đồ đầy đủ</button>
      </div>
    `;
  }
}

// ===== FORMS =====
function initForms() {
  // Rescue form
  document.getElementById("rescueForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const location  = document.getElementById("rescueLocation")?.value?.trim() || "";
    const phone     = document.getElementById("rescuePhone")?.value?.trim() || "";
    const condition = document.getElementById("rescueCondition")?.value || "";
    const desc      = document.getElementById("rescueDesc")?.value?.trim() || "";
    const typeRadio = document.querySelector('input[name="rescueType"]:checked');
    const type      = typeRadio ? typeRadio.value : "other";

    if (!location || !phone) {
      showToast("⚠️ Vui lòng điền vị trí và số điện thoại!");
      return;
    }
    if (!condition) {
      showToast("⚠️ Vui lòng chọn tình trạng của thú cưng!");
      return;
    }

    // Lấy ảnh preview nếu người dùng đã upload
    const zone = document.getElementById("uploadZone");
    const previewImg = zone ? zone.querySelector("img") : null;
    const photoData = previewImg ? previewImg.src : null;

    const emojiMap = { cat: "🐱", dog: "🐶", other: "🐾" };
    const condMap  = { urgent: "urgent", watch: "watch", safe: "safe", unknown: "watch" };

    // Lưu vào pawlink_pending để Admin thấy
    const PENDING_KEY = "pawlink_pending";
    let pending = [];
    try { pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]"); } catch {}
    pending.push({
      id: "RPT-" + Date.now(),
      submitTime: "Vừa xong",
      reporter: "Người dùng",
      phone, location,
      name: "Chưa đặt tên",
      type,
      emoji: emojiMap[type] || "🐾",
      age: "Không rõ",
      gender: "Không rõ",
      condition: condMap[condition] || "watch",
      desc: desc || "Không có mô tả",
      photo: photoData,
      tags: ["Báo cáo mới"],
      bgColor: "#FFF0E8",
      vaccinated: false,
      neutered: false,
      status: "pending",
      fosterDays: 0,
      costs: "0 VNĐ",
      time: new Date().toISOString()
    });
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));

    showToast("🚨 Báo cáo đã gửi! Volunteer sẽ liên hệ bạn trong 15 phút.");
    e.target.reset();
    if (window.resetUploadZone) window.resetUploadZone();
  });

  // Foster form
  document.getElementById("fosterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name  = document.getElementById("fosterName")?.value?.trim() || "";
    const phone = document.getElementById("fosterPhone")?.value?.trim() || "";
    const area  = document.getElementById("fosterArea")?.value?.trim() || "";
    const typeRaw = document.getElementById("fosterType")?.value || "";
    const typeLabel = typeRaw.includes("Cả hai") ? "Chó + Mèo"
                    : typeRaw.includes("Chó") ? "Chó" : "Mèo";

    if (!name || !phone || !area) {
      showToast("⚠️ Vui lòng điền đầy đủ họ tên, SĐT và địa chỉ!");
      return;
    }

    let fosters = [];
    try { fosters = JSON.parse(localStorage.getItem("pawgen_fosters") || "[]"); } catch {}
    fosters.push({
      id: Date.now(), name, phone, area, type: typeLabel,
      rating: 5, current: 0, max: 1, avatar: "🐾",
      joined: new Date().toLocaleDateString("vi-VN"),
      status: "active", source: "website"
    });
    localStorage.setItem("pawgen_fosters", JSON.stringify(fosters));

    showToast("🏠 Đăng ký nuôi tạm thành công! Chúng mình sẽ liên hệ trong 24h.");
    e.target.reset();
  });

  // Volunteer form
  document.getElementById("volunteerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name  = document.getElementById("volName")?.value?.trim() || "";
    const email = document.getElementById("volEmail")?.value?.trim() || "";
    const phone = document.getElementById("volPhone")?.value?.trim() || "";
    const area  = document.getElementById("volArea")?.value?.trim() || "";
    const role  = document.getElementById("volunteerRole")?.textContent?.trim() || "Rescuer";

    const times = [];
    if (document.getElementById("volTimeSang")?.checked)     times.push("Sáng");
    if (document.getElementById("volTimeChieu")?.checked)    times.push("Chiều");
    if (document.getElementById("volTimeToi")?.checked)      times.push("Tối");
    if (document.getElementById("volTimeCuoiTuan")?.checked) times.push("Cuối tuần");

    if (!name || !phone) {
      showToast("⚠️ Vui lòng điền họ tên và số điện thoại!");
      return;
    }

    let volunteers = [];
    try { volunteers = JSON.parse(localStorage.getItem("pawgen_volunteers") || "[]"); } catch {}
    volunteers.push({
      id: Date.now(), name, phone, email,
      area: area || "Chưa rõ", role,
      availableTime: times.join(", "),
      status: "active", missions: 0,
      joined: new Date().toLocaleDateString("vi-VN"),
      source: "website"
    });
    localStorage.setItem("pawgen_volunteers", JSON.stringify(volunteers));

    closeModal("volunteerModal");
    showToast("✅ Đơn đăng ký tình nguyện đã được gửi! Cảm ơn bạn rất nhiều!");
    e.target.reset();
  });
}

// ===== UPLOAD ZONE =====
function initUploadZone() {
  const zone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");

  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("⚠️ Vui lòng chọn file ảnh (JPG, PNG, GIF...)!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      zone.innerHTML = `
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center">
          <img src="${ev.target.result}" alt="preview" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--forest-light)"/>
          <div style="text-align:left">
            <div style="color:var(--forest-light);font-weight:600">✅ Đã tải ảnh</div>
            <div style="font-size:0.78rem;color:var(--mid-gray);margin-top:0.2rem">${file.name}</div>
            <div style="font-size:0.72rem;color:var(--mid-gray)">${(file.size / 1024).toFixed(1)} KB</div>
            <button type="button" onclick="resetUploadZone()" style="margin-top:0.4rem;padding:0.2rem 0.6rem;font-size:0.72rem;background:none;border:1px solid var(--light-gray);border-radius:6px;cursor:pointer;color:var(--mid-gray)">Đổi ảnh</button>
          </div>
        </div>
      `;
      zone.style.borderColor = "var(--forest-light)";
      zone.style.background = "#F0FFF4";
      zone._file = file;
    };
    reader.readAsDataURL(file);
  }

  window.resetUploadZone = function () {
    zone._file = null;
    zone.style.borderColor = "";
    zone.style.background = "";
    zone.innerHTML = `<span>📷 Nhấn để tải ảnh lên hoặc kéo thả</span>`;
    reinitZoneEvents();
  };

  function reinitZoneEvents() {
    const fi =
      zone.querySelector("input[type=file]") ||
      (() => {
        const inp = document.createElement("input");
        inp.type = "file";
        inp.accept = "image/*";
        inp.style.display = "none";
        zone.appendChild(inp);
        return inp;
      })();
    fi.addEventListener("change", (e) => handleFile(e.target.files[0]));
    zone.onclick = () => fi.click();
  }

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.style.borderColor = "var(--terracotta)";
    zone.style.background = "#FFF5F0";
  });
  zone.addEventListener("dragleave", () => {
    zone.style.borderColor = "";
    zone.style.background = "";
  });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  });

  zone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));
  fileInput.addEventListener("click", (e) => e.stopPropagation());
}

// ===== MODALS =====
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

// Close modal on overlay click
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

// Volunteer modal
function openVolunteerModal(role) {
  document.getElementById("volunteerRole").textContent = role;
  openModal("volunteerModal");
}

function openPartnerModal() {
  showToast("📧 Vui lòng liên hệ hello@pawgen.vn để hợp tác!");
}

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
}

// ===== KEYBOARD ESC =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => {
      m.classList.remove("open");
      document.body.style.overflow = "";
    });
    closeMobileMenu();
  }
});

// ===== NAV AUTH =====
function initNavAuth() {
  const navAuth = document.getElementById("navAuth");
  if (!navAuth) return;

  let session = null;
  try {
    const raw =
      localStorage.getItem("pawlink_session") ||
      localStorage.getItem("pawgen_session");
    session = raw ? JSON.parse(raw) : null;
  } catch {}

  if (!session) {
    navAuth.innerHTML = `
      <a href="login.html" class="btn-nav-login">👤 Đăng nhập</a>
      <a href="login.html" style="margin-left:0.5rem;padding:0.5rem 1rem;background:var(--forest);color:#fff;border-radius:var(--radius-sm);font-size:0.82rem;font-weight:600;white-space:nowrap;display:inline-block;">🛡️ Admin</a>
    `;
  } else {
    const initial = session.name ? session.name.charAt(0).toUpperCase() : "U";
    const isAdmin = session.role === "admin";
    navAuth.innerHTML = `
      <div class="nav-user-pill">
        <div class="nav-avatar ${isAdmin ? "admin-av" : ""}">${initial}</div>
        <span>${session.name.split(" ").slice(-1)[0]}</span>
        ${isAdmin ? '<span style="font-size:0.65rem;background:var(--forest);color:#fff;padding:0.1rem 0.4rem;border-radius:4px;margin-left:2px">Admin</span>' : ""}
        <div class="nav-dropdown">
          <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--light-gray)">
            <div style="font-weight:700;font-size:0.85rem">${session.name}</div>
            <div style="font-size:0.72rem;color:var(--mid-gray)">${session.email || ""}</div>
          </div>
          <a href="admin.html" class="nav-dd-item">🛡️ Trang quản trị</a>
          <a href="#rescue" class="nav-dd-item" onclick="scrollToSection('rescue')">🚨 Báo cứu hộ</a>
          <a href="#adopt" class="nav-dd-item" onclick="scrollToSection('adopt')">🐾 Tìm thú cưng</a>
          <div class="nav-dd-divider"></div>
          <button class="nav-dd-item danger" onclick="logoutUser()">⏻ Đăng xuất</button>
        </div>
      </div>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem("pawgen_session");
  localStorage.removeItem("pawlink_session");
  window.location.reload();
}
