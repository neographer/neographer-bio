const fs = require("fs");
const path = require("path");

// Raw data rows from the PDF OCR
const rawCancellations = [
  // DELHI
  ["Delhi", "Parliament of India", "13.02.1995", "Sansad Marg NA", "Central Delhi", "110001", "Removed"],
  ["Delhi", "Peacock (Philately Logo)", "04.07.2024", "National Philatelic Museum", "Central Delhi", "110001", "Working"],
  ["Delhi", "Rashtrapati Bhavan", "26.05.2014", "Rashtrapati Bhavan SO", "Central Delhi", "110004", "Working"],
  ["Delhi", "Red Fort", "01.12.1975", "Red Fort NA", "North Delhi", "110006", "Removed"],
  ["Delhi", "Red Fort", "22.11.2023", "Philatelic Gallery, Red Fort", "North Delhi", "110006", "Working"],
  ["Delhi", "Qutub Minar", "15.01.1955", "Qutub Minar NA", "South West Delhi", "110030", "Removed"],
  
  // HARYANA
  ["Haryana", "Zaffargarh Fort", "26.07.2024", "Kila Zaffargarh BO", "Jind", "126101", "Working"],
  
  // PUNJAB
  ["Punjab", "Sri Harmandir Sahib (Golden Temple)", "20.01.1982", "Amritsar HO-PB", "Amritsar", "143001", "Doubtful"],
  
  // CHANDIGARH
  ["Chandigarh", "Rose Flower, Open Hand Monument, Sukhna Lake, Yacht and Shivalik Hills", "20.07.1991", "Chandigarh GPO", "Chandigarh", "160017", "Working"],
  
  // HIMACHAL PRADESH
  ["Himachal Pradesh", "Himalayan Monal", "28.05.2004", "Shimla GPO-PB", "Shimla", "171001", "Working"],
  ["Himachal Pradesh", "Bhadramukha Shiva", "Not Available", "Ambedkar Chowk SO", "Shimla", "171004", "Working"],
  ["Himachal Pradesh", "Tabo Monastery", "22.03.2022", "Tabo SO", "Lahaul and Spiti", "172113", "Working"],
  ["Himachal Pradesh", "Hikkim Post Office", "22.03.2022", "Hikkim BO", "Lahaul and Spiti", "172114", "Working"],
  ["Himachal Pradesh", "Key Monastery", "22.03.2022", "Kee Gompa BO", "Lahaul and Spiti", "172114", "Working"],
  ["Himachal Pradesh", "Chicham Bridge", "22.03.2022", "Kibber BO", "Lahaul and Spiti", "172114", "Working"],
  ["Himachal Pradesh", "Sri Hidimba Devi Temple", "16.08.2004", "Manali SO", "Kullu", "175131", "Working"],
  ["Himachal Pradesh", "Jawalamukhi Temple", "24.11.2004", "Jawalamukhi SO", "Kangra", "176031", "Working"],
  ["Himachal Pradesh", "Himalayas and Paragliding", "26.11.2022", "Bir SO", "Kangra", "176077", "Working"],
  ["Himachal Pradesh", "Dhauladhar Mountains, Kangra Tea & Temple", "10.08.2020", "Dharamsala HO", "Kangra", "176215", "Working"],
  ["Himachal Pradesh", "Himalayas and Mane Prayer Wheel", "26.11.2022", "Mcleodganj SO", "Kangra", "176219", "Working"],
  
  // JAMMU AND KASHMIR
  ["Jammu and Kashmir", "Raghunath Mandir", "23.10.2022", "Raghunath Bazaar SO", "Jammu", "180001", "Working"],
  ["Jammu and Kashmir", "Vaishno Devi Temple", "19.04.2012", "Katra SO", "Reasi", "182301", "Working"],
  ["Jammu and Kashmir", "Chinar Leaves", "05.09.1980", "Srinagar GPO", "Srinagar", "190001", "Removed"],
  ["Jammu and Kashmir", "Dal Lake and Shikara", "16.11.2022", "Srinagar GPO", "Srinagar", "190001", "Working"],
  ["Jammu and Kashmir", "Shikara in Dal Lake", "13.09.1978", "Nehru Park SO", "Srinagar", "190001", "Working"],
  ["Jammu and Kashmir", "Lal Chowk", "23.05.2013", "Lal Chowk SO", "Srinagar", "190001", "Removed"],
  ["Jammu and Kashmir", "Ghanta Ghar", "26.11.2024", "Lal Chowk SO", "Srinagar", "190001", "Working"],
  ["Jammu and Kashmir", "Shri Amarnath Ji", "29.06.2024", "Pahalgam SO", "Anantnag", "192126", "Working"],
  ["Jammu and Kashmir", "Gondola Ropeway", "11.10.2022", "Gulmarg SO", "Baramulla", "193403", "Working"],
  
  // LADAKH
  ["Ladakh", "Shanti Stupa", "14.10.2022", "Leh HO", "Leh", "194101", "Working"],
  
  // UTTAR PRADESH
  ["Uttar Pradesh", "Aligarh Lock", "03.11.2023", "Aligarh HO", "Aligarh", "202001", "Working"],
  ["Uttar Pradesh", "Sarnath Temple", "19.10.1982", "Varanasi HO-PB", "Varanasi", "221001", "Removed"],
  ["Uttar Pradesh", "Shri Kashi Vishwanath Mandir, Varanasi", "13.12.2021", "Varanasi HO-PB", "Varanasi", "221001", "Working"],
  ["Uttar Pradesh", "Hanuman Garhi, Ayodhya", "04.12.2021", "Ayodhya HO", "Ayodhya", "224001", "Working"],
  ["Uttar Pradesh", "Sri Ram Janmbhoomi Temple", "22.01.2024", "Ayodhya HO", "Ayodhya", "224001", "Working"],
  ["Uttar Pradesh", "Husainabad Clock Tower", "13.10.1998", "Lucknow GPO-PB", "Lucknow", "226001", "Working"],
  ["Uttar Pradesh", "Rose Flower", "01.07.1977", "Gokhale Marg SO", "Lucknow", "226001", "Working"],
  ["Uttar Pradesh", "Raj Bhawan, Lucknow", "15.05.2023", "UP Governor Camp SO", "Lucknow", "226027", "Working"],
  ["Uttar Pradesh", "Dr. B. R. Ambedkar Uttar Pradesh Police Academy", "29.12.2022", "PTC Moradabad SO", "Moradabad", "244001", "Working"],
  ["Uttar Pradesh", "Taj Mahal", "03.06.1981", "Agra HO-PB", "Agra", "282001", "Working"],
  ["Uttar Pradesh", "Taj Mahal", "Not Available", "Taj SO", "Agra", "282001", "Working"],
  ["Uttar Pradesh", "Taj Mahal", "Not Available", "Taj SO", "Agra", "282001", "Working"],
  ["Uttar Pradesh", "Buland Darwaza", "Not Available", "Fatehpur Sikri SO", "Agra", "283110", "Removed"],
  
  // UTTARAKHAND
  ["Uttarakhand", "Spotted Deer-Save Our Heritage, Preserve Wildlife", "24.01.1976", "Corbett National Park, Dhikala BO", "Nainital", "244715", "Working"],
  ["Uttarakhand", "Shree Badarinath Temple", "06.10.2024", "Badrinath Seasonal SO", "Chamoli", "248179", "Working"],
  ["Uttarakhand", "Himalayas and Kedarnath Temple", "16.06.1983", "Dehradun PB", "Dehradun", "248001", "Removed"],
  ["Uttarakhand", "Himalayas and Badrinath Temple", "04.11.2013", "Dehradun PB", "Dehradun", "248001", "Working"],
  ["Uttarakhand", "Lal Bahadur Shastri National Academy of Administration", "17.03.2022", "Mussoorie SO", "Mussoorie", "248179", "Working"],
  ["Uttarakhand", "Mountains", "Not Available", "Nainital PB", "Nainital", "263001", "Working"],
  ["Uttarakhand", "Jageshwar Group of Temples", "04.11.2023", "Jageshwar BO", "Almora", "263623", "Working"],
  
  // RAJASTHAN
  ["Rajasthan", "Hawa Mahal", "18.11.1977", "Jaipur GPO-PB", "Jaipur", "302001", "Removed"],
  ["Rajasthan", "Hawa Mahal", "27.09.2005", "Tripolia Bazaar SO", "Jaipur", "302002", "Working"],
  ["Rajasthan", "Sundial, Jai Singh Observatory", "06.03.1977", "Rambagh Palace, Jaipur SO", "Jaipur", "302005", "Removed"],
  ["Rajasthan", "Ganesh Pol, Amer Fort", "18.11.2001", "Amer SO", "Jaipur", "302028", "Removed"],
  ["Rajasthan", "Amer Fort", "02.11.2023", "Amer SO", "Jaipur", "302028", "Working"],
  ["Rajasthan", "Prithviraj Chauhan", "01.11.2011", "Ajmer HO-PB", "Ajmer", "305001", "Working"],
  ["Rajasthan", "Ranakpur Jain Temple", "12.04.2008", "Ranakpur BO", "Pali", "306702", "Working"],
  ["Rajasthan", "Delwara Jain Temple", "27.02.1986", "Delwara BO", "Sirohi", "307501", "Working"],
  ["Rajasthan", "Delwara Jain Temple", "Not Available", "Mount Abu SO", "Sirohi", "307501", "Working"],
  ["Rajasthan", "Vijay Stambh or Victory Tower", "15.12.1980", "Chittorgarh HO", "Chittorgarh", "312001", "Removed"],
  ["Rajasthan", "Maharana Pratap", "21.03.1978", "Panchwati Udaipur SO", "Udaipur", "313001", "Replaced"],
  ["Rajasthan", "Maharana Pratap", "Not Available", "Shastri Circle Udaipur SO", "Udaipur", "313001", "Working"],
  ["Rajasthan", "Ghana Bird Sanctuary", "Not Available", "Bharatpur HO", "Bharatpur", "321001", "Removed"],
  ["Rajasthan", "Siberian Crane", "21.08.1993", "Forest Lodge, Bharatpur BO", "Bharatpur", "321001", "Working"],
  ["Rajasthan", "Ranathambore Fort", "27.09.1992", "Sawai Madhopur HO", "Sawai Madhopur", "322001", "Removed"],
  ["Rajasthan", "Shri Mahaveer Mandir", "28.11.2022", "Shrimahaveerji SO", "Karauli", "322220", "Working"],
  ["Rajasthan", "BITS Pilani Clock Tower", "12.11.2005", "BITS Pilani SO", "Jhunjhunu", "333031", "Removed"],
  ["Rajasthan", "Shri Karni Mata Deshnoke", "21.02.2004", "Bikaner HO", "Bikaner", "334001", "Working"],
  ["Rajasthan", "Acharya Tulsi Shakti Peeth", "31.12.2004", "Gangashahar SO", "Bikaner", "334401", "Working"],
  ["Rajasthan", "Mehrangarh Fort", "03.08.1984", "Jodhpur HO", "Jodhpur", "342001", "Working"],
  
  // GUJARAT
  ["Gujarat", "Alfred High School", "02.10.1991", "Rajkot HO-PB", "Rajkot", "360001", "Replaced"],
  ["Gujarat", "Mohandas Gandhi Vidyalaya", "Not Available", "Rajkot HO-PB", "Rajkot", "360001", "Replaced"],
  ["Gujarat", "Mahatma Gandhi Museum", "02.10.2020", "Rajkot HO-PB", "Rajkot", "360001", "Working"],
  ["Gujarat", "Kirti Mandir-The Birth Place of Mahatma Gandhi", "18.04.1992", "Porbandar HO", "Porbandar", "360575", "Working"],
  ["Gujarat", "Arabian Sea Octopus", "02.01.2011", "Jamnagar HO", "Jamnagar", "361001", "Working"],
  ["Gujarat", "Arabia Sea & Bet Dwarka", "08.04.2011", "Bet SO", "Jamnagar", "361330", "Working"],
  ["Gujarat", "Dwarkadhish Temple, Land of Sri Krishna", "16.07.1984", "Dwarka SO", "Devbhoomi Dwarka", "361335", "Working"],
  ["Gujarat", "Asiatic Lions & Visit Sasan Gir Wildlife Sanctuary", "01.11.1975", "Sasan Gir SO", "Junagadh", "362135", "Working"],
  ["Gujarat", "Sri Somnath Temple", "16.02.1977", "Prabhas Patan SO", "Junagadh", "362268", "Working"],
  ["Gujarat", "Indian Wild Ass", "14.10.2010", "Dhrangadhra MDG-SO", "Surendranagar", "363310", "Working"],
  ["Gujarat", "Siddha Chakra", "03.07.1992", "Palitana SR SO", "Bhavnagar", "364270", "Working"],
  ["Gujarat", "Visit Flamingo City, Bird Sanctuary", "16.07.1984", "Bhuj HO", "Kachchh", "370001", "Working"],
  ["Gujarat", "Harappan Culture", "02.02.2021", "Dholavira BO", "Kachchh", "370165", "Working"],
  ["Gujarat", "Kachchhi Mudwork", "02.02.2021", "Khavda SO", "Kachchh", "370510", "Working"],
  ["Gujarat", "Lakhpat Fort, Kachchhh", "02.02.2021", "Lakhpat BO", "Kachchh", "370627", "Working"],
  ["Gujarat", "Architectural Delights Sidi Saiyad’s Window", "16.07.1984", "Ahmedabad GPO", "Ahmedabad", "380001", "Working"],
  ["Gujarat", "Sardar Vallabhbhai Patel National Memorial", "14.08.2006", "Shahibaug SO", "Ahmedabad", "380004", "Working"],
  ["Gujarat", "Kocharab Satyagraha Ashram Smarak", "30.01.1998", "Ellis Bridge SO", "Ahmedabad", "380006", "Working"],
  ["Gujarat", "Adalaj Stepwell", "27.03.1986", "Navrangpura HO", "Ahmedabad", "380009", "Removed"],
  ["Gujarat", "Sidi Saiyad’s Mosque Window", "31.03.2007", "IIM, Ahmedabad SO", "Ahmedabad", "380015", "Working"],
  ["Gujarat", "Hridaykunj Sabarmati Ashram", "06.04.1976", "Gandhi Ashram SO", "Ahmedabad", "380027", "Replaced"],
  ["Gujarat", "Spinning Wheel (Charakha)", "30.01.1995", "Gandhi Ashram SO", "Ahmedabad", "380027", "Replaced"],
  ["Gujarat", "Sabarmati Ashram", "30.11.2021", "Gandhi Ashram SO", "Ahmedabad", "380027", "Working"],
  ["Gujarat", "Lothal Seal", "17.12.1997", "Lothal Bhurkhi Railway Station SO", "Ahmedabad", "382230", "Working"],
  ["Gujarat", "Rani Ki Vav (Stepwell)", "09.10.2002", "Patan (NG) SO", "Patan", "384265", "Working"],
  ["Gujarat", "Surya Temple", "02.04.1977", "Modhera SO", "Mehsana", "384212", "Working"],
  ["Gujarat", "Birth Place of Sardar Vallabhbhai Patel", "31.10.2020", "Nadiad HO", "Kheda", "387001", "Working"],
  ["Gujarat", "Shri Ranchhordraiji Maharaj Temple", "13.11.2022", "Dakor SO", "Kheda", "388225", "Working"],
  ["Gujarat", "Sardar Vallabhbhai Patel", "31.10.2002", "Karamsad SO", "Anand", "388325", "Working"],
  ["Gujarat", "Chamar Dharini", "16.01.1989", "Vadodara HO", "Vadodara", "390001", "Working"],
  ["Gujarat", "Maharaja Sayajirao Gaekwad", "16.01.1989", "Vadodara Fateganj HO", "Vadodara", "390002", "Working"],
  ["Gujarat", "Sardar Sarovar Project and Statue of Unity (1)", "09.10.1990", "Kevadia Colony SO", "Narmada", "393151", "Working"],
  ["Gujarat", "Sardar Sarovar Project and Statue of Unity (2)", "09.10.1990", "Kevadia Colony SO", "Narmada", "393151", "Working"],
  ["Gujarat", "Hajira Lighthouse", "21.09.2021", "Hajira SO", "Surat", "394270", "Working"],
  ["Gujarat", "Musical Instruments of Local Tribes", "27.03.1984", "Saputara SO", "Dang", "394720", "Working"],
  
  // DADRA AND NAGAR HAVELI AND DAMAN AND DIU
  ["Dadra and Nagar Haveli and Daman and Diu", "Diu Fort", "03.01.2022", "Diu SO", "Junagadh", "362520", "Working"],
  
  // MAHARASHTRA
  ["Maharashtra", "Trimurthi", "26.01.1977", "Mumbai GPO-PB", "Mumbai City", "400001", "Removed"],
  ["Maharashtra", "Mumbai GPO Building", "14.07.2023", "Mumbai GPO-PB", "Mumbai City", "400001", "Working"],
  ["Maharashtra", "Gateway of India", "28.12.2023", "Taj Mahal SO", "Mumbai City", "400001", "Working"],
  ["Maharashtra", "Flamingo", "08.10.2024", "Airoli Node SO", "Thane", "400708", "Working"],
  ["Maharashtra", "Trimurthi", "16.04.1992", "Elephanta Caves BO", "Mumbai", "400021", "Working"],
  ["Maharashtra", "Pune Head Post Office Building", "04.10.1977", "Pune HO-PB", "Pune", "411001", "Working"],
  ["Maharashtra", "Shaniwar Wada", "02.03.1992", "Shaniwar Peth SO", "Pune", "411030", "Working"],
  ["Maharashtra", "Strawberry", "09.12.2024", "Mahabaleshwar SO", "Satara", "412806", "Working"],
  ["Maharashtra", "Pratapgad Fort", "18.12.2023", "Pratapgad BO", "Satara", "412806", "Working"],
  ["Maharashtra", "Vithoba Temple", "26.01.1977", "Pandharpur HO", "Solapur", "413304", "Working"],
  ["Maharashtra", "Kirloskar Engine", "24.11.2022", "Kirloskarvadi SO", "Sangli", "416308", "Working"],
  ["Maharashtra", "Chand Minar", "26.01.1977", "Daulatabad HO", "Aurangabad", "431002", "Working"],
  ["Maharashtra", "Deep Stambh", "08.01.1965", "Ellora Caves BO", "Aurangabad", "431102", "Working"],
  ["Maharashtra", "Entrance of Cave-19 (1)", "08.01.1965", "Ajanta Caves BO", "Aurangabad", "431117", "Replaced"],
  ["Maharashtra", "Entrance of Cave-19 (2)", "26.01.1977", "Ajanta Caves BO", "Aurangabad", "431117", "Working"],
  ["Maharashtra", "Six Tusk Elephant", "26.11.1991", "Ajanta Caves BO", "Aurangabad", "431117", "Working"],
  ["Maharashtra", "Nagpur GPO Building", "13.10.2020", "Nagpur GPO", "Nagpur", "440001", "Working"],
  ["Maharashtra", "Deekshabhoomi", "14.04.2023", "Shankar Nagar SO", "Nagpur", "440010", "Working"],
  ["Maharashtra", "Lonar Lake", "11.10.2022", "Lonar SO", "Buldhana", "443302", "Doubtful"],
  
  // GOA
  ["Goa", "Indian Bison, Cashew, Fish, and Coconut Tree", "13.10.2020", "Panaji HO-PB", "North Goa", "403001", "Working"],
  ["Goa", "Reis Magos Fort", "13.12.2021", "Reis Magos SO", "North Goa", "403114", "Working"],
  ["Goa", "Basilica of Bom Jesus", "09.10.2020", "Velha Goa SO", "North Goa", "403402", "Working"],
  ["Goa", "Mangueshi Temple", "02.12.2021", "Mardol SO", "North Goa", "403404", "Working"],
  ["Goa", "Tambdi Surla", "13.12.2021", "Sancordem BO", "North Goa", "403406", "Working"],
  ["Goa", "Bondla Wildlife Sanctuary", "15.12.2021", "Usgaon BO", "North Goa", "403406", "Working"],
  ["Goa", "Malabar Tree-Nymph", "03.03.2022", "Valpoi SO", "North Goa", "403506", "Working"],
  ["Goa", "Fort Aguada Lighthouse", "30.11.2021", "Candolim SO", "North Goa", "403515", "Working"],
  ["Goa", "Margao Head Post Office Building", "17.12.2021", "Margao HO", "South Goa", "403601", "Working"],
  ["Goa", "Humpback Dolphin", "22.02.2022", "Palolem BO", "South Goa", "403702", "Working"],
  ["Goa", "Big Foot Sculpture of Meerabai", "12.10.2018", "Loutulim SO", "South Goa", "403718", "Working"],
  ["Goa", "Olive Ridley Turtle", "21.03.2022", "Loliem SO", "South Goa", "403728", "Working"],
  
  // MADHYA PRADESH
  ["Madhya Pradesh", "Rajwada Palace and India Post Logo", "04.03.2021", "Indore GPO", "Indore", "452001", "Working"],
  ["Madhya Pradesh", "Raja Bhoj", "11.06.2023", "Raja Bhoj Airport SO", "Bhopal", "462036", "Working"],
  ["Madhya Pradesh", "Udaigiri Caves-Varaha (Boar) Carving", "Not Available", "Udaigiri BO", "Vidisha", "464001", "Working"],
  ["Madhya Pradesh", "Sanchi Stupa", "01.01.1966", "Sanchi SO", "Raisen", "464661", "Working"],
  ["Madhya Pradesh", "Bhimbhetka", "Not Available", "Ankalpur BO", "Raisen", "464993", "Working"],
  ["Madhya Pradesh", "Khajuraho Temple", "18.02.1965", "Khajuraho SO", "Chhatarpur", "471606", "Working"],
  ["Madhya Pradesh", "Badal Mahal", "06.08.2019", "Chanderi SO", "Ashok Nagar", "473446", "Working"],
  
  // CHHATTISGARH
  ["Chhattisgarh", "Steel Ladle", "03.02.1984", "Civic Centre, Bhilai SO", "Durg", "490006", "Working"],
  ["Chhattisgarh", "Bhoramdeo Temple", "11.10.2023", "Chhapri BO", "Kawardha", "491995", "Working"],
  ["Chhattisgarh", "Thermal Power Plant", "29.01.1992", "Raipur GPO-PB", "Raipur", "492001", "Removed"],
  ["Chhattisgarh", "Chhattisgarh – A \"Rice Bowl\"", "27.09.2023", "Raipur GPO-PB", "Raipur", "492001", "Working"],
  ["Chhattisgarh", "Sirpur Ancient City", "01.12.2012", "Sirpur BO", "Mahasamund", "493445", "Removed"],
  ["Chhattisgarh", "Indian Bison (Gaur)", "27.09.2024", "Barnawapara BO", "Raipur", "493551", "Working"],
  ["Chhattisgarh", "Shring Rishi", "27.09.2024", "Sihawa BO", "Dhamtari", "493778", "Working"],
  ["Chhattisgarh", "Saint Vallabhacharya & Champeshwar Nath Temple", "27.09.2024", "Champaran BO", "Raipur", "493885", "Working"],
  ["Chhattisgarh", "Chitraote Waterfall", "27.09.2024", "Chitrakote BO", "Bastar", "494010", "Working"],
  ["Chhattisgarh", "Rudra Shiv Sculpture", "09.10.1993", "Bilaspur HO", "Bilaspur", "495001", "Working"],
  ["Chhattisgarh", "Lemru Elephant Reserve", "11.10.2023", "Bango Dam BO", "Korba", "495448", "Working"],
  ["Chhattisgarh", "Kotmi Sonar Crocodile Park", "11.10.2023", "Kotmi Sonar BO", "Janjgir-Champa", "495552", "Working"],
  ["Chhattisgarh", "Snake", "16.07.2024", "Tapkra SO", "Jashpur", "496227", "Working"],
  ["Chhattisgarh", "Old Tibetan Buddhist Monastery", "11.10.2023", "Kamleshwarpur BO", "Surguja", "497111", "Working"],
  
  // TELANGANA
  ["Telangana", "Charminar", "21.04.1975", "Hyderabad GPO", "Hyderabad", "500001", "Working"],
  ["Telangana", "Osmania University", "11.10.1976", "Jama-I-Osmania SO", "Hyderabad", "500007", "Working"],
  ["Telangana", "Golconda Fort", "27.09.2021", "Golconda SO", "Hyderabad", "500008", "Working"],
  ["Telangana", "Ronald Ross Building", "20.08.2021", "Begumpet SO", "Hyderabad", "500016", "Working"],
  ["Telangana", "Railway Engine", "11.02.1976", "Rail Nilayam SO", "Hyderabad", "500025", "Working"],
  ["Telangana", "Buddha Statue", "01.12.2021", "Himayat Nagar SO", "Hyderabad", "500029", "Working"],
  ["Telangana", "Medak Cathedral", "17.12.2021", "Medak HO", "Medak", "502110", "Working"],
  ["Telangana", "Warangal Gate", "01.08.1975", "Warangal HO", "Warangal", "506002", "Working"],
  ["Telangana", "Bhakta Ramadasu", "09.04.1976", "Bhadrachalam HO", "Bhadradri Kothagudem", "507111", "Doubtful"],
  
  // ANDHRA PRADESH
  ["Andhra Pradesh", "Tirumala Gopuram, Sankhu, and Chakra", "14.10.1975", "Tirupati HO", "Tirupati", "517501", "Working"],
  ["Andhra Pradesh", "Tallapaka Annamacharya", "06.11.1976", "Tirumala SO", "Tirupati", "517504", "Working"],
  ["Andhra Pradesh", "Deity of Sri Kalahasteeswara Swamy", "14.02.1980", "Srikalahasti HO", "Tirupati", "517644", "Working"],
  ["Andhra Pradesh", "Gopuram of Sri Mallikarjuna Swamy Temple", "07.03.1978", "Srisailam SO", "Nandyala", "518101", "Working"],
  ["Andhra Pradesh", "Amaravathi Stupa", "11.02.1976", "Amaravathi SO", "Palnadu", "522020", "Working"],
  ["Andhra Pradesh", "ISRO Radar", "20.04.1976", "Sriharikota Range SO", "Tirupati", "524124", "Working"],
  ["Andhra Pradesh", "Dolphin’s Nose Lighthouse", "10.04.1982", "Visakhapatnam HO", "Visakhapatnam", "530001", "Removed"],
  ["Andhra Pradesh", "Ancient Marine Craft from the Legend of Buddha", "30.09.1975", "Visakhapatnam Shipyard HO", "Visakhapatnam", "530001", "Removed"],
  ["Andhra Pradesh", "Gopuram of Sri Varaha Lakshmi Narasimha Swamy Temple", "25.07.1987", "Simhachalam SO", "Visakhapatnam", "530028", "Working"],
  ["Andhra Pradesh", "Gopuram of Sri Suryanarayana Swamy Temple", "11.04.2013", "Arasavalli SO", "Srikakulam", "532401", "Working"],
  ["Andhra Pradesh", "Gopuram of Sri Kurmanathaswamy Temple", "11.04.2013", "Srikurmam SO", "Srikakulam", "532404", "Doubtful"],
  
  // KARNATAKA
  ["Karnataka", "Vidhana Soudha", "05.01.1979", "Bengaluru GPO-PB", "Bengaluru Urban", "560001", "Working"],
  ["Karnataka", "Karnataka High Court Building", "21.01.2022", "High Court SO", "Bengaluru Urban", "560001", "Working"],
  ["Karnataka", "Kempegowda Tower", "23.07.2013", "Basavanagudi HO", "Bengaluru Urban", "560004", "Working"],
  ["Karnataka", "Rajajinagar Foundation Pillar", "26.11.2024", "Rajajinagar HO", "Bengaluru Urban", "560010", "Working"],
  ["Karnataka", "Ashoka Pillar", "18.04.2024", "Jayanagar 3rd Block SO", "Bengaluru Urban", "560011", "Working"],
  ["Karnataka", "Indian Institute of Science Building", "21.01.2022", "Science Institute SO", "Bengaluru Urban", "560012", "Working"],
  ["Karnataka", "Butterfly-Malabar Banded Peacock", "23.05.1979", "Bannerghatta SO", "Bengaluru Urban", "560083", "Working"],
  ["Karnataka", "Nandi Statue", "09.06.1989", "Nandi Hills BO", "Chikkaballapura", "562101", "Working"],
  ["Karnataka", "Grizzled Giant Squirrel", "21.01.2022", "Helagalli BO", "Ramanagara", "562117", "Working"],
  ["Karnataka", "Gold Miner", "16.11.2018", "Championreefs SO", "Kolar", "563117", "Working"],
  ["Karnataka", "Elephant Carrying Howdah", "11.10.2002", "Mysuru HO", "Mysuru", "570001", "Working"],
  ["Karnataka", "Mahishasura", "10.12.2005", "Chamundibetta BO", "Mysuru", "570010", "Working"],
  ["Karnataka", "Nada Mantapa", "31.05.2008", "S.G.S. Ashram, Mysuru SO", "Mysuru", "570025", "Working"],
  ["Karnataka", "Sri Chennakesava Temple", "02.01.1978", "Somanathapur BO", "Mysuru", "571120", "Working"],
  ["Karnataka", "Panchalinga Darshan", "01.12.1986", "Talakad SO", "Mysuru", "571122", "Working"],
  ["Karnataka", "Tiger Face", "23.06.1978", "Bandipur BO", "Chamarajanagara", "571126", "Replaced"],
  ["Karnataka", "Tiger Paw", "01.04.1992", "Bandipur BO", "Chamarajanagara", "571126", "Doubtful"],
  ["Karnataka", "Odi Kathi & Peechi Kathi", "07.09.1989", "Madikeri HO", "Kodagu", "571201", "Working"],
  ["Karnataka", "Gloriosa Superba (Wild Lily)", "06.11.1987", "Nagarahole BO", "Kodagu", "571250", "Working"],
  ["Karnataka", "Porcupine", "21.01.2022", "Kyathadevaragudi BO", "Chamarajanagara", "571342", "Working"],
  ["Karnataka", "Flying Pelican", "28.01.1992", "Kokkare Bellur BO", "Mandya", "571433", "Working"],
  ["Karnataka", "Gumbaz", "20.10.1978", "Srirangapatna HO", "Mandya", "571438", "Replaced"],
  ["Karnataka", "Crown and Sword of Tipu Sultan", "20.06.1987", "Srirangapatna HO", "Mandya", "571438", "Working"],
  ["Karnataka", "Elephant", "21.01.2022", "Mahadeshwara Malai SO", "Chamarajanagara", "571490", "Working"],
  ["Karnataka", "His Holiness Sri Sivakumara Mahaswamiji", "21.02.2020", "Siddaganga Mutt SO", "Tumakuru", "572104", "Working"],
  ["Karnataka", "Pinchi Basadi, Mandaragiri", "22.02.2020", "Hirehalli SO", "Tumakuru", "572168", "Working"],
  ["Karnataka", "Darpana Sundari", "02.01.1978", "Belur SO", "Hassan", "573115", "Working"],
  ["Karnataka", "Natya Saraswati", "02.01.1978", "Halebeedu SO", "Hassan", "573121", "Working"],
  ["Karnataka", "Gomateswara", "02.01.1978", "Shravanabelagola SO", "Hassan", "573135", "Working"],
  ["Karnataka", "Seated Tirthankara", "05.02.1991", "Karkala HO", "Udupi", "574104", "Working"],
  ["Karnataka", "Mattu Gulla", "26.11.2024", "Katapadi SO", "Udupi", "574105", "Working"],
  ["Karnataka", "Kaup Lighthouse", "20.08.2017", "Kaup SO", "Udupi", "574106", "Working"],
  ["Karnataka", "Kere Basadi", "05.01.2024", "Varanga BO", "Udupi", "574108", "Working"],
  ["Karnataka", "Shankarpura Mallige", "26.11.2024", "Shankarpura SO", "Udupi", "574115", "Working"],
  ["Karnataka", "Sri Durga Parameshwari Temple", "20.09.2000", "Kateel SO", "Dakshina Kannada", "574148", "Working"],
  ["Karnataka", "Sri Manjunatheswara Temple", "02.01.1989", "Dharmasthala SO", "Dakshina Kannada", "574216", "Working"],
  ["Karnataka", "Saavira Kambada Basadi", "18.11.2016", "Moodbidri SO", "Dakshina Kannada", "574227", "Working"],
  ["Karnataka", "Head of Serpent Vasuki", "14.04.2005", "Subramanya SO", "Dakshina Kannada", "574238", "Working"],
  ["Karnataka", "Baahubali (Lord Gomateswara Statue)", "18.11.2016", "Venur SO", "Dakshina Kannada", "574242", "Working"],
  ["Karnataka", "Mangaluru Lighthouse", "11.09.1989", "Mangaluru HO", "Dakshina Kannada", "575001", "Working"],
  ["Karnataka", "Deity of Sri Krishna", "14.01.1985", "Udupi HO", "Udupi", "576101", "Working"],
  ["Karnataka", "Sri Venugopala Swamy Temple", "04.12.1988", "Manipal HO", "Udupi", "576104", "Working"],
  ["Karnataka", "St. Mary’s Islands", "17.01.2015", "Malpe SO", "Udupi", "576108", "Working"],
  ["Karnataka", "Kavi Muddana & Manorame", "24.01.2015", "Nandalike BO", "Udupi", "576111", "Working"],
  ["Karnataka", "Indian Spotted Chevrotain (Mouse Deer)", "31.07.2020", "Someshwara BO", "Udupi", "576112", "Working"],
  ["Karnataka", "St. Lawrence Minor Basilica", "18.01.2018", "Attur BO", "Udupi", "576117", "Working"],
  ["Karnataka", "Kathale Basadi", "17.01.2015", "Barkur SO", "Udupi", "576210", "Working"],
  ["Karnataka", "Sri Mookambika Temple, Kollur", "13.11.2002", "Kollur SO", "Udupi", "576220", "Working"],
  ["Karnataka", "Yakshagana of Mandarthi", "14.10.2005", "Mandarthi SO", "Udupi", "576223", "Working"],
  ["Karnataka", "Sri Chennagiri Rengappa Clock Tower", "19.01.2017", "Davanagere HO", "Davanagere", "577001", "Working"],
  ["Karnataka", "Sri Vidyasankara Temple", "27.01.1985", "Sringeri SO", "Chikkamagaluru", "577139", "Working"],
  ["Karnataka", "Kalinga - King Cobra", "07.12.2018", "Agumbe SO", "Shivamogga", "577411", "Working"],
  ["Karnataka", "Kundadri Shri Parshwanatha Basadi", "13.11.2024", "Kendalbailu BO", "Shivamogga", "577411", "Working"],
  ["Karnataka", "Sri Hombuja Jain Math", "13.10.2019", "Humcha SO", "Shivamogga", "577436", "Working"],
  ["Karnataka", "Onake Obavva", "21.01.2017", "Chitradurga HO", "Chitradurga", "577501", "Working"],
  ["Karnataka", "Unkal Lake", "26.11.2024", "Hubballi HO", "Dharwad", "580020", "Working"],
  ["Karnataka", "Sri Sharifa Shivayogi and Guru Govind Shivayogi", "26.11.2024", "Shishuvinahal BO", "Haveri", "581126", "Working"],
  ["Karnataka", "Symbols of Sri Venkataramana Temple", "17.12.2017", "Manjuguni BO", "Uttara Kannada", "581315", "Working"],
  ["Karnataka", "Lord Shiva", "16.12.2017", "Murudeshwar SO", "Uttara Kannada", "581350", "Working"],
  ["Karnataka", "Kumaravyasa", "26.11.2024", "Gadag HO", "Gadag", "582101", "Working"],
  ["Karnataka", "Ballari Fort", "26.11.2024", "Ballari Fort SO", "Ballari", "583102", "Working"],
  ["Karnataka", "Parvati - Kumaraswamy Temple", "26.11.2024", "Sandur SO", "Ballari", "583119", "Working"],
  ["Karnataka", "Sri Gavi Siddeshwar Samsthana Sri Gavimath", "26.11.2024", "Koppal HO", "Koppal", "583231", "Working"],
  ["Karnataka", "Stone Chariot", "02.01.1978", "Hampi SO", "Vijayanagara", "583239", "Working"],
  ["Karnataka", "Sloth Bear-Daroji Bear Sanctuary", "05.01.2011", "Kannada University Campus SO", "Vijayanagara", "583276", "Working"],
  ["Karnataka", "Sri Appannacharya Swamiji's House - Abode of Sri Guru Raghavendra Swami", "26.11.2024", "Bichali BO", "Raichur", "584140", "Working"],
  ["Karnataka", "Bara Gazi Toph", "26.11.2024", "Kalaburagi HO", "Kalaburagi", "585101", "Working"],
  ["Karnataka", "Bonal Bird Sanctuary", "26.11.2024", "Bonal BO", "Yadgiri", "585224", "Working"],
  ["Karnataka", "Anubhava Mantapa", "10.01.2019", "Basavakalyan SO", "Bidar", "585327", "Working"],
  ["Karnataka", "Madrasa of Mohammed Gawan", "11.12.2005", "Bidar HO", "Bidar", "585401", "Working"],
  ["Karnataka", "Guru Nanak Jhira", "09.01.2019", "Guru Nanak Jhira SO", "Bidar", "585402", "Working"],
  ["Karnataka", "Gol Gumbaz", "28.09.1987", "Vijayapura HO", "Vijayapura", "586101", "Working"],
  ["Karnataka", "Chalukyan Royal Emblem", "28.02.1990", "Aihole BO", "Bagalkote", "587124", "Working"],
  ["Karnataka", "Lord Nataraja", "29.09.1987", "Badami SO", "Bagalkote", "587201", "Working"],
  ["Karnataka", "Galaganatha Temple", "30.09.1987", "Pattadakal BO", "Bagalkote", "587201", "Working"],
  ["Karnataka", "Kittur Rani Chennamma", "01.03.2001", "Belagavi HO", "Belagavi", "590001", "Removed"],
  ["Karnataka", "Clock Tower of Belgaum", "23.12.2020", "Belagavi HO", "Belagavi", "590001", "Working"],
  ["Karnataka", "Kamal Basadi", "23.12.2020", "Belagavi Fort SO", "Belagavi", "590016", "Working"],
  ["Karnataka", "Kittur Rani Chennamma", "23.10.2024", "Kittur SO", "Belagavi", "591115", "Working"],
  ["Karnataka", "Royal Logo of Kadamba", "04.05.1993", "Halashi BO", "Belagavi", "591120", "Working"],
  ["Karnataka", "Panchalingeswar Temple", "23.12.2020", "Hooli BO", "Belagavi", "591126", "Working"],
  ["Karnataka", "Sri Renuka Yallamma Devasthan", "14.03.2022", "Yallamma Hill SO", "Belagavi", "591173", "Working"],
  ["Karnataka", "Bhimgad Wildlife Sanctuary", "15.03.2022", "Shiroli BO", "Belagavi", "591302", "Working"],
  
  // TAMIL NADU
  ["Tamil Nadu", "Anna Road Post Office (Warwick Electric Theatre)", "31.03.1998", "Anna Road HO", "Chennai", "600002", "Working"],
  ["Tamil Nadu", "Punnai Leaves and Peacock", "14.11.1979", "Mylapore HO", "Chennai", "600004", "Working"],
  ["Tamil Nadu", "University of Madras", "11.10.2023", "Madras University SO", "Chennai", "600005", "Working"],
  ["Tamil Nadu", "Pulicat Lighthouse", "21.08.2021", "Pulicat SO", "Tiruvallur", "601205", "Working"],
  ["Tamil Nadu", "Shore Temple", "01.01.1965", "Mamallapuram SO", "Chengalpattu", "603104", "Working"],
  ["Tamil Nadu", "Painted Stork", "03.06.1974", "Vedanthangal BO", "Kanchipuram", "603314", "Working"],
  ["Tamil Nadu", "Gingee Fort", "29.12.1979", "Gingee SO", "Villupuram", "604202", "Working"],
  ["Tamil Nadu", "Oil Lamp", "12.12.1997", "Tiruvannamalai HO", "Tiruvannamalai", "606601", "Working"],
  ["Tamil Nadu", "Logo of Sri Ramanasramam", "01.09.2014", "Sri Ramanasramam SO", "Tiruvannamalai", "606603", "Working"],
  ["Tamil Nadu", "Sathya Gnana Sabha", "30.01.1999", "Vadalur SO", "Cuddalore", "607303", "Working"],
  ["Tamil Nadu", "Pichavaram Mangrove Forest", "26.07.2024", "Killai SO", "Cuddalore", "608102", "Working"],
  ["Tamil Nadu", "Thyagarajaswamy Temple Chariot", "14.10.1989", "Tiruvarur HO", "Tiruvarur", "610001", "Working"],
  ["Tamil Nadu", "Dargah Sharif", "08.10.1976", "Nagore SO", "Nagapattinam", "611002", "Working"],
  ["Tamil Nadu", "Shrine Basilica of Mother Mary", "29.11.1976", "Vailankanni SO", "Nagapattinam", "611111", "Working"],
  ["Tamil Nadu", "Bull and Elephant Sculpture", "09.10.2024", "Darasuram SO", "Thanjavur", "612702", "Working"],
  ["Tamil Nadu", "Great Nandi", "09.10.2024", "Gangaikondacholapuram SO", "Ariyalur", "612901", "Working"],
  ["Tamil Nadu", "Brihadeeswara Swamy Temple", "10.12.1974", "Thanjavur HO", "Thanjavur", "613001", "Working"],
  ["Tamil Nadu", "Saint Tyagaraja", "20.01.1976", "Thiruvaiyaru SO", "Thanjavur", "613204", "Working"],
  ["Tamil Nadu", "Flamingo", "02.12.1977", "Kodikkarai SO", "Nagapattinam", "614807", "Working"],
  ["Tamil Nadu", "Rock Fort", "17.12.1974", "Tiruchirappalli PB", "Tiruchirappalli", "620001", "Working"],
  ["Tamil Nadu", "Adiseshan of Lord Ranganatha", "17.01.1981", "Srirangam HO", "Tiruchirappalli", "620006", "Working"],
  ["Tamil Nadu", "Sri Ramanathaswamy Temple Corridor", "07.03.1978", "Rameswaram SO", "Ramanathapuram", "623526", "Working"],
  ["Tamil Nadu", "Kodaikanal Observatory", "05.09.1979", "Kodaikanal SO", "Dindigul", "624101", "Working"],
  ["Tamil Nadu", "Vel (Spear) and Peacock Feather of Lord Murugan", "08.09.1978", "Palani HO", "Dindigul", "624601", "Working"],
  ["Tamil Nadu", "Flag of Pandya Dynasty with Aquarius Emblem", "06.09.1981", "Madurai HO", "Madurai", "625001", "Working"],
  ["Tamil Nadu", "Meenakshi Amman Temple", "28.04.2017", "Madurai Bazaar SO", "Madurai", "625001", "Working"],
  ["Tamil Nadu", "Lion Tailed Macaque", "03.10.1978", "Kalakad SO", "Tirunelveli", "627501", "Working"],
  ["Tamil Nadu", "Courtallam Waterfalls", "01.08.1977", "Courtallam SO", "Tenkasi", "627802", "Working"],
  ["Tamil Nadu", "Manapad Lighthouse", "05.01.2017", "Manapad SO", "Thoothukudi", "628209", "Working"],
  ["Tamil Nadu", "Mahakavi Subramanya Bharatiyar Face", "11.12.1991", "Ettayapuram SO", "Thoothukudi", "628902", "Working"],
  ["Tamil Nadu", "Mahakavi Subramanya Bharatiyar Manimandapam", "11.12.1991", "Ettayapuram SO", "Thoothukudi", "628902", "Removed"],
  ["Tamil Nadu", "Muttom Lighthouse", "05.01.2017", "Muttom SO", "Kanniyakumari", "629202", "Working"],
  ["Tamil Nadu", "Vivekananda Rock Memorial", "21.11.1975", "Kanniyakumari SO", "Kanniyakumari", "629702", "Working"],
  ["Tamil Nadu", "Chakravaha", "18.04.2023", "Kanchipuram HO", "Kanchipuram", "631501", "Working"],
  ["Tamil Nadu", "Logo of CMC Hospital", "09.12.2014", "CMC Hospital, Vellore SO", "Vellore", "632004", "Working"],
  ["Tamil Nadu", "Vellore Fort with Moat", "03.03.2017", "Vellore Fort SO", "Vellore", "632004", "Working"],
  ["Tamil Nadu", "Vainu Bappu Observatory", "05.12.1986", "Kavalur BO", "Krishnagiri", "635701", "Working"],
  ["Tamil Nadu", "Gandhi Chakra and Bapu", "30.01.1997", "Hasthampatti SO", "Salem", "636007", "Working"],
  ["Tamil Nadu", "Lord Ardhanareeswar", "05.01.2017", "Tiruchengode HO", "Namakkal", "637211", "Working"],
  ["Tamil Nadu", "Bhavani Koodal and Rajagopuram", "25.08.1977", "Bhavani HO", "Erode", "638301", "Working"],
  ["Tamil Nadu", "Logo of Tamil Nadu Agricultural University", "01.07.2019", "TNAU-Lawley Road SO", "Coimbatore", "641003", "Working"],
  ["Tamil Nadu", "Patteeswarar Temple", "03.02.1976", "Perur, Coimbatore SO", "Coimbatore", "641010", "Working"],
  ["Tamil Nadu", "Salim Ali Centre for Ornithology and Natural History (SACON)", "06.06.2019", "Anaikatti BO", "Coimbatore", "641108", "Working"],
  ["Tamil Nadu", "Adi Yogi", "24.02.2017", "Ishana Vihar BO", "Coimbatore", "641114", "Working"],
  ["Tamil Nadu", "Our Lady of Holy Rosary Shrine", "29.09.2017", "Karumathampatti SO", "Coimbatore", "641659", "Working"],
  ["Tamil Nadu", "Nilgiri Tahr", "14.10.1980", "Top Slip BO", "Coimbatore", "642133", "Working"],
  ["Tamil Nadu", "Toda Hut", "15.07.1994", "Udagamandalam HO", "Nilgiris", "643001", "Working"],
  ["Tamil Nadu", "Nilgiri Mountain Train", "10.08.2019", "Coonoor Railway Station SO", "Nilgiris", "643102", "Working"],
  ["Tamil Nadu", "Indian Bison (Gaur)", "05.04.1975", "Mudumalai Sanctuary BO", "Nilgiris", "643211", "Working"],
  
  // PUDUCHERRY
  ["Puducherry", "Aayi Mandapam", "13.03.1998", "Pondicherry HO-PB", "Puducherry", "605001", "Working"],
  ["Puducherry", "Logo of Sri Aurobindo Ashram and The Mother", "15.08.2013", "Sri Aurobindo Ashram SO", "Puducherry", "605002", "Working"],
  
  // KERALA
  ["Kerala", "Face of Theyyam", "10.11.2016", "Kannur HO", "Kannur", "670001", "Working"],
  ["Kerala", "Muzhappilangad Beach", "03.08.2006", "Muzhappilangad SO", "Kannur", "670662", "Working"],
  ["Kerala", "Madhur Ananteshwara Vinayaka Temple", "14.12.2015", "Madhur BO", "Kasargod", "671124", "Working"],
  ["Kerala", "Bekal Fort", "23.02.1983", "Bekal Fort SO", "Kasargod", "671316", "Working"],
  ["Kerala", "Mask of Theyyam", "22.01.2003", "Kozhikode (Calicut) HO", "Kozhikode", "673001", "Working"],
  ["Kerala", "Uru or Fat Boat", "17.05.2006", "Beypore SO", "Kozhikode", "673015", "Working"],
  ["Kerala", "Heron", "05.06.2005", "Kadalundi SO", "Kozhikode", "673302", "Working"],
  ["Kerala", "Thunchath Ramanujam Ezhuthachan", "17.06.1999", "Tirur SO", "Malappuram", "676101", "Working"],
  ["Kerala", "Mamankam", "15.02.2010", "Tirunavaya SO", "Malappuram", "676301", "Working"],
  ["Kerala", "Vaidyaratnam P. S. Warrier", "30.01.2018", "Kottakkal SO", "Malappuram", "676503", "Removed"],
  ["Kerala", "Kalpathi Rathotsavam", "22.08.2003", "Kalpathi SO", "Palakkad", "678003", "Working"],
  ["Kerala", "Chembai Vaidyanatha Bhagavathar", "24.05.2005", "Kottayi SO", "Palakkad", "678572", "Working"],
  ["Kerala", "Lion Tailed Macaque", "31.10.1992", "Agali SO", "Palakkad", "678581", "Working"],
  ["Kerala", "Malampuzha Dam and Rope Car", "22.08.2005", "Malampuzha Dam SO", "Palakkad", "678651", "Working"],
  ["Kerala", "Indian Bison (Gaur)", "31.10.1992", "Parambikulam SO", "Palakkad", "678661", "Working"],
  ["Kerala", "Head Gear of Ottanthullal", "15.10.1997", "Lakkidi SO", "Palakkad", "679301", "Working"],
  ["Kerala", "Vesham in Kathakali", "09.11.1998", "Cheruthuruthy SO", "Thrissur", "679531", "Working"],
  ["Kerala", "Thrissur Pooram Festival Elephant", "31.10.1992", "Thrissur HO", "Thrissur", "680001", "Working"],
  ["Kerala", "Bell and Flag Mast in Guruvayur Sri Krishna Temple", "12.11.1988", "Guruvayur SO", "Thrissur", "680101", "Working"],
  ["Kerala", "Shrine of St. Joseph Church", "13.05.1996", "Pavaratti SO", "Thrissur", "680507", "Working"],
  ["Kerala", "Shrine of Our Lady of Perpetual Help", "14.04.2007", "Mattom SO", "Thrissur", "680602", "Working"],
  ["Kerala", "Lighted Candles in Holy Cross Church, Mapranam", "14.09.2009", "Madayikonam SO", "Thrissur", "680712", "Working"],
  ["Kerala", "Chinese Fishing Net", "21.08.1998", "Kochi HO", "Ernakulam", "682001", "Working"],
  ["Kerala", "Magen David of Cochin Synagogue", "09.03.1982", "Mattancherry Jetty SO", "Ernakulam", "682002", "Working"],
  ["Kerala", "Thookkuvilakku", "16.06.1978", "Ernakulam HO-PB", "Ernakulam", "682011", "Working"],
  ["Kerala", "Adi Sankaracharya", "16.12.1987", "Kalady SO", "Ernakulam", "683574", "Working"],
  ["Kerala", "St. Thomas Church", "14.11.1992", "Malayattoor SO", "Ernakulam", "683587", "Working"],
  ["Kerala", "Thekkady Wildlife-Asian Elephant", "11.10.1975", "Kumily SO", "Idukki", "685509", "Working"],
  ["Kerala", "Nilgiri Tahr", "11.09.1998", "Munnar SO", "Idukki", "685612", "Working"],
  ["Kerala", "Saint Alphonsa", "19.07.1996", "Bharananganam BO", "Kottayam", "686578", "Working"],
  ["Kerala", "Alappuzha Boat Race", "11.08.1984", "Alappuzha HO", "Alappuzha", "688001", "Working"],
  ["Kerala", "Aranmula Boat Race", "31.10.1992", "Aranmula SO", "Pathanamthitta", "689533", "Working"],
  ["Kerala", "The Ayyappa Temple", "16.11.1974", "Sabarimalai SO", "Pathanamthitta", "689713", "Replaced"],
  ["Kerala", "Pathinettampadi (Holy Eighteen Steps)", "25.12.1980", "Sabarimalai SO", "Pathanamthitta", "689713", "Working"],
  ["Kerala", "Logo of Mata Amritanandamayi Math", "22.11.2019", "Amrithapuri SO", "Kollam", "690546", "Working"],
  ["Kerala", "Face Mask of Kathakali", "01.01.1979", "Thiruvananthapuram GPO-PB", "Thiruvananthapuram", "695001", "Working"],
  ["Kerala", "Rocket and Coconut Tree", "19.04.1977", "Thiruvananthapuram ISRO SO", "Thiruvananthapuram", "695022", "Working"],
  ["Kerala", "Statue of Sri Narayana Guru", "31.10.1992", "Varkala SO", "Thiruvananthapuram", "695141", "Working"],
  ["Kerala", "Beach, Coconut Trees, and Waves", "31.10.1992", "Kovalam BO", "Thiruvananthapuram", "695527", "Working"],
  ["Kerala", "Ponmudi Hill Resort", "31.10.1992", "Ponmudi BO", "Thiruvananthapuram", "695551", "Working"],
  
  // WEST BENGAL
  ["West Bengal", "Kolkata City and Famous Places of Kolkata", "26.06.2007", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Kolkata GPO Dome", "01.10.2018", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Alipore Central Jail", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Dakshineswar Kali Temple", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Durga Puja", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Indian Museum", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Jorasanko Thakurbari", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Kalighat Temple", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Victoria Memorial Hall", "11.10.2023", "Kolkata GPO", "Kolkata", "700001", "Working"],
  ["West Bengal", "Shuttlecock", "20.07.2022", "Jaduberia BO", "Howrah", "711316", "Working"],
  ["West Bengal", "Rathyatra Mahesh", "24.11.2022", "Mahesh-1 SO", "Hooghly", "712202", "Working"],
  ["West Bengal", "Khejuri Branch Post Office", "16.02.2023", "Khejuri BO", "Purba Medinpur", "721431", "Working"],
  ["West Bengal", "Rajbari Jhargram Palace", "27.02.2023", "Jhargram HO", "Jhargram", "721507", "Working"],
  ["West Bengal", "Tamralipta Rajbari", "24.02.2023", "Tamluk HO", "Purba Medinpur", "721636", "Working"],
  ["West Bengal", "Bishnupur Shyamrai Temple", "25.01.2023", "Bishnupur SO", "Bankura", "722122", "Working"],
  ["West Bengal", "Bishnupur Mukhya Dakghar", "01.03.2024", "Bishnupur SO", "Bankura", "722122", "Working"],
  ["West Bengal", "Rooftop Bell and Clock Tower of Santinikketan", "19.08.2024", "Santiniketan SO", "Birbhum", "731235", "Working"],
  ["West Bengal", "Sevoke Coronation Bridge", "01.01.2022", "Siliguri HO", "Darjeeling", "734001", "Working"],
  ["West Bengal", "Tea-Elixir of Life", "01.01.2022", "Darjeeling HO", "Darjeeling", "734101", "Working"],
  ["West Bengal", "Unicorns of Dooars", "01.01.2022", "Mal HO", "Jalpaiguri", "735221", "Working"],
  ["West Bengal", "Cooch Behar Palace", "29.11.2008", "Cooch Behar HO", "Cooch Behar", "736101", "Working"],
  ["West Bengal", "Dooars Tusker", "01.01.2022", "Alipurduar SO", "Alipurduar", "736121", "Working"],
  
  // SIKKIM
  ["Sikkim", "Red Panda-State Animal of Sikkim", "18.09.2021", "Gangtok HO", "Gangtok", "737101", "Working"],
  
  // ANDAMAN AND NICOBAR ISLANDS
  ["Andaman and Nicobar Islands", "Cellular Jail", "01.11.2004", "Port Blair HO", "South Andaman", "744101", "Working"],
  
  // ODISHA
  ["Odisha", "Khandagiri Udayagiri Caves, Dhauligiri Hills & Lingraj Temple", "13.09.2006", "Bhubaneshwar GPO-PB", "Khordha", "751001", "Working"],
  ["Odisha", "Khandagiri Caves and Elephant Sculpture", "15.06.2021", "Khandagiri SO", "Khordha", "751030", "Working"],
  ["Odisha", "Sri Jagannath Temple and Sea Wave", "13.07.2021", "Puri HO", "Puri", "752001", "Working"],
  ["Odisha", "Stone Chariot Wheel of the Surya Temple", "05.10.1979", "Konark SO", "Puri", "752111", "Working"],
  ["Odisha", "Odissi Dance and Barabati Fort", "18.11.2007", "Cuttack GPO-PB", "Cuttack", "753001", "Working"],
  ["Odisha", "Maa Samaleswari Temple and Musical Instruments", "16.01.2021", "Sambalpur HO-PB", "Sambalpur", "768001", "Working"],
  
  // ASSAM
  ["Assam", "Sri Kamakhya Devi Temple", "27.09.2007", "Guwahati GPO", "Kamrup Metropolitan", "781001", "Working"],
  ["Assam", "One Horned Rhino", "15.08.1974", "Kaziranga National Park SO", "Golaghat", "785609", "Working"],
  ["Assam", "Rang Ghar", "02.01.1979", "Sivasagar HO", "Sivasagar", "785640", "Removed"],
  
  // MANIPUR
  ["Manipur", "Sangai Deer", "29.02.1988", "Imphal HO", "Imphal West", "795001", "Removed"],
  ["Manipur", "Sangai Deer", "10.03.1978", "Moirang SO", "Bishnupur", "795133", "Working"],
  
  // MIZORAM
  ["Mizoram", "Horn and Pipe", "15.12.1977", "Aizawl HO", "Aizawl", "796001", "Removed"],
  
  // TRIPURA
  ["Tripura", "Trimurti Rock Sculpture", "01.01.1976", "Bhagabannagar BO", "North Tripura", "799279", "Working"],
  
  // BIHAR
  ["Bihar", "Didarganj Yakshi", "28.08.1974", "Patna GPO", "Patna", "800001", "Working"],
  ["Bihar", "Gol Ghar", "Not Available", "Patna GPO", "Patna", "800001", "Working"],
  ["Bihar", "Patna GPO Building", "25.09.2024", "Patna GPO", "Patna", "800001", "Working"],
  ["Bihar", "Takhat Sri Harmandir Sahib Ji, Patna Sahib", "08.10.2024", "Patna City SO", "Patna", "800008", "Working"],
  ["Bihar", "Nalanda Ruins", "08.10.2024", "Nalanda SO", "Nalanda", "801303", "Working"],
  ["Bihar", "Nagi Dam Bird Sanctuary", "08.10.2024", "Jhajha SO", "Jamui", "811308", "Working"],
  ["Bihar", "Sher Shah Suri Tomb", "08.10.2024", "Sasaram HO", "Rohtas", "821115", "Working"],
  ["Bihar", "Deo Sun Temple", "08.10.2024", "Deo SO", "Aurangabad", "824202", "Working"],
  ["Bihar", "Mahabodhi Temple", "08.10.2024", "Bodhgaya SO", "Gaya", "824231", "Working"],
  ["Bihar", "Ashokan Pillar", "08.10.2024", "Bakhra SO", "Muzaffarpur", "843101", "Working"],
  ["Bihar", "Valmiki Tiger Reserve", "08.10.2024", "Valmiki Nagar SO", "West Champaran", "845107", "Working"],
  ["Bihar", "Postal Training Centre, Darbhanga", "08.10.2024", "Postal Training Centre SO", "Darbhanga", "846005", "Working"],
  ["Bihar", "Mahakavi Vidyapati", "14.01.2013", "Bisfi SO", "Madhubani", "847122", "Working"],
  
  // JHARKHAND
  ["Jharkhand", "Baidyanath Temple", "22.03.2018", "Deoghar HO", "Deoghar", "814112", "Working"],
  ["Jharkhand", "Basukinath Temple", "22.03.2018", "Basukinath Dham SO", "Dumka", "814118", "Working"],
  ["Jharkhand", "Tiger Reserve", "01.11.2016", "Daltonganj HO", "Palamu", "822101", "Doubtful"],
  ["Jharkhand", "Parasnath Temple", "29.12.2016", "Shikherjee SO", "Giridih", "825329", "Working"],
  ["Jharkhand", "Chhinnamastika Temple", "01.11.2016", "Rajrappa Project SO", "Ramgarh", "829150", "Doubtful"],
  ["Jharkhand", "Jamshedji Nusserwanji Tata & Steel City", "29.12.2016", "Jamshedpur HO", "Purbi Singhbhum", "831001", "Working"],
  ["Jharkhand", "Chhau Dance", "01.11.2016", "Saraikela SO", "Seraikela-Kharsawan", "833219", "Doubtful"],
  ["Jharkhand", "Queen of Chhotanagpur", "01.11.2016", "Netarhat SO", "Latehar", "835218", "Doubtful"]
];

// Helper to map state names to three-letter codes for IDs
const stateCodeMap = {
  "Delhi": "DEL", "Haryana": "HAR", "Punjab": "PUN", "Chandigarh": "CHD",
  "Himachal Pradesh": "HP", "Jammu and Kashmir": "JK", "Ladakh": "LAD",
  "Uttar Pradesh": "UP", "Uttarakhand": "UK", "Rajasthan": "RAJ",
  "Gujarat": "GUJ", "Dadra and Nagar Haveli and Daman and Diu": "DD",
  "Maharashtra": "MAH", "Goa": "GOA", "Madhya Pradesh": "MP",
  "Chhattisgarh": "CG", "Telangana": "TEL", "Andhra Pradesh": "AP",
  "Karnataka": "KAR", "Tamil Nadu": "TN", "Puducherry": "PY",
  "Kerala": "KER", "West Bengal": "WB", "Sikkim": "SK",
  "Andaman and Nicobar Islands": "AN", "Odisha": "OD", "Assam": "ASM",
  "Manipur": "MN", "Mizoram": "MZ", "Tripura": "TR", "Bihar": "BIH",
  "Jharkhand": "JHA"
};

// State counts to track the sequential number in the ID
const stateCounters = {};

const cancellations = rawCancellations.map(([state, subject, introDate, poName, district, pincode, status]) => {
  // Generate ID
  const sCode = stateCodeMap[state] || "OTH";
  stateCounters[sCode] = (stateCounters[sCode] || 0) + 1;
  const seq = String(stateCounters[sCode]).padStart(3, "0");
  const id = `${sCode}-${seq}`;

  // 1. Deduce Category
  let category = "Culture & Folk Art";
  const subLower = subject.toLowerCase();
  
  if (
    subLower.includes("temple") || subLower.includes("mandir") || subLower.includes("shiva") || 
    subLower.includes("basadi") || subLower.includes("ashram") || subLower.includes("church") || 
    subLower.includes("mosque") || subLower.includes("cathedral") || subLower.includes("kashi") || 
    subLower.includes("vishwanath") || subLower.includes("janmbhoomi") || subLower.includes("dharmasthala") || 
    subLower.includes("theyyam") || subLower.includes("math") || subLower.includes("spiritual") ||
    subLower.includes("kalahasteeswara") || subLower.includes("mallikarjuna") || subLower.includes("suryanarayana") || 
    subLower.includes("kurmanathaswamy") || subLower.includes("jageshwar") || subLower.includes("mahaveer") || 
    subLower.includes("somnath") || subLower.includes("dwarkadhish") || subLower.includes("badarinath") || 
    subLower.includes("amarnath") || subLower.includes("vaishno devi") || subLower.includes("harmandir") || 
    subLower.includes("golden temple") || subLower.includes("shree") || subLower.includes("st. lawrence") ||
    subLower.includes("saint joseph") || subLower.includes("our lady") || subLower.includes("annamacharya") ||
    subLower.includes("ramadasu") || subLower.includes("dargah") || subLower.includes("sabarmati") ||
    subLower.includes("bapu") || subLower.includes("satyagraha") || subLower.includes("shishuvinahal")
  ) {
    category = "Spiritual & Pilgrimage";
  } else if (
    subLower.includes("fort") || subLower.includes("palace") || subLower.includes("ruins") || 
    subLower.includes("monument") || subLower.includes("stupa") || subLower.includes("tower") || 
    subLower.includes("gate") || subLower.includes("gumbaz") || subLower.includes("window") || 
    subLower.includes("jail") || subLower.includes("lal chowk") || subLower.includes("ghanta ghar") || 
    subLower.includes("corridor") || subLower.includes("seal") || subLower.includes("minar") || 
    subLower.includes("darwaza") || subLower.includes("clock tower") || subLower.includes("kittur") || 
    subLower.includes("gingee") || subLower.includes("cellular") || subLower.includes("rang ghar") ||
    subLower.includes("chamar dharini") || subLower.includes("pillar") || subLower.includes("sidi saiyad") ||
    subLower.includes("lothal") || subLower.includes("sarnath") || subLower.includes("qutub") ||
    subLower.includes("hampi") || subLower.includes("stone chariot") || subLower.includes("madrasa") ||
    subLower.includes("badal mahal") || subLower.includes("vijay stambh") || subLower.includes("observatory") ||
    subLower.includes("sundial") || subLower.includes("dome") || subLower.includes("shanti stupa")
  ) {
    category = "Heritage & Monuments";
  } else if (
    subLower.includes("bird") || subLower.includes("deer") || subLower.includes("wild") || 
    subLower.includes("national park") || subLower.includes("tiger") || subLower.includes("reserve") || 
    subLower.includes("elephant") || subLower.includes("pelican") || subLower.includes("cobra") || 
    subLower.includes("tahr") || subLower.includes("monal") || subLower.includes("ass") || 
    subLower.includes("rhino") || subLower.includes("dolphin") || subLower.includes("turtle") || 
    subLower.includes("crane") || subLower.includes("peacock") || subLower.includes("flower") || 
    subLower.includes("squirrel") || subLower.includes("porcupine") || subLower.includes("octopus") || 
    subLower.includes("sangai") || subLower.includes("unicorns") || subLower.includes("tusker") || 
    subLower.includes("lake") || subLower.includes("waterfalls") || subLower.includes("hills") || 
    subLower.includes("mountains") || subLower.includes("himalayas") || subLower.includes("valley") ||
    subLower.includes("sanctuary") || subLower.includes("pichavaram") || subLower.includes("sukhna") || 
    subLower.includes("rose") || subLower.includes("forest") || subLower.includes("flamingo") ||
    subLower.includes("chinar") || subLower.includes("strawberry") || subLower.includes("nandi") ||
    subLower.includes("agumbe") || subLower.includes("crocodile") || subLower.includes("snake")
  ) {
    category = "Nature & Geography";
  } else if (
    subLower.includes("radar") || subLower.includes("engine") || subLower.includes("lighthouse") || 
    subLower.includes("lock") || subLower.includes("kirloskar") || subLower.includes("ropeway") || 
    subLower.includes("bridge") || subLower.includes("spinning") || subLower.includes("charakha") || 
    subLower.includes("shuttlecock") || subLower.includes("rocket") || subLower.includes("chicham") ||
    subLower.includes("gondola") || subLower.includes("science") || subLower.includes("isro") ||
    subLower.includes("bell") || subLower.includes("clock") || subLower.includes("electric") ||
    subLower.includes("observatory") || subLower.includes("telescope")
  ) {
    category = "Science & Technology";
  } else if (
    subLower.includes("university") || subLower.includes("academy") || subLower.includes("museum") ||
    subLower.includes("police") || subLower.includes("training") || subLower.includes("administration") ||
    subLower.includes("parliament") || subLower.includes("bhavan") || subLower.includes("raj bhawan") ||
    subLower.includes("governor") || subLower.includes("institute") || subLower.includes("court") ||
    subLower.includes("hospital") || subLower.includes("post office") || subLower.includes("dakghar")
  ) {
    category = "Leaders & Institutions";
  }

  // 2. Generate Motif description
  let motif = "";
  if (category === "Spiritual & Pilgrimage") {
    motif = `Illustrates a line drawing of the sacred architecture, central shrine, or main entrance of the historic ${subject}.`;
  } else if (category === "Heritage & Monuments") {
    motif = `Depicts the historic stone carving, brick arches, or structural columns of ${subject}, showcasing local archaeological heritage.`;
  } else if (category === "Nature & Geography") {
    motif = `Features the profile of ${subject} surrounded by the local natural geography of ${district}, representing regional flora, fauna, or landscape.`;
  } else if (category === "Science & Technology") {
    motif = `Line artwork mapping the engineering details, machinery, or functional structure of ${subject}.`;
  } else if (category === "Leaders & Institutions") {
    motif = `A clean line illustration representing the emblem, main facade, or core architectural features of ${subject}.`;
  } else {
    motif = `Displays the symbolic local emblem, traditional artwork, or historical motif representing the cultural essence of ${subject}.`;
  }

  // Add specific touch points to motif if applicable
  if (subLower.includes("temple") || subLower.includes("mandir")) {
    motif += " Shows the gopuram, shikhar towers, and flags.";
  } else if (subLower.includes("fort") || subLower.includes("palace")) {
    motif += " Features the fortified high walls, arches, and ramparts.";
  } else if (subLower.includes("lake") || subLower.includes("waterfalls")) {
    motif += " Depicts water ripples, surrounding ridges, and local vegetation.";
  } else if (subLower.includes("lighthouse") || subLower.includes("clock tower")) {
    motif += " Shows the towering beacon structure with circular window markers.";
  }

  // 3. Generate Details description
  let details = "";
  if (category === "Spiritual & Pilgrimage") {
    details = `The ${subject} at ${poName} is a revered spiritual landmark in the ${district} district of ${state}. Visited by millions, it holds key historical and cultural significance in the religious timeline of India, which is celebrated through this permanent pictorial postmark.`;
  } else if (category === "Heritage & Monuments") {
    details = `Commemorating the architectural genius of ${subject} in ${state}. It represents an epoch in the history of the region and serves as a major tourist highlight, preserved under this special cancellation to promote national heritage appreciation.`;
  } else if (category === "Nature & Geography") {
    details = `Highlighting the natural wonders, wildlife conservation, or scenic beauties of the ${district} region in ${state}. This postmark helps raise awareness for preserving the natural ecosystem and promoting local eco-tourism.`;
  } else if (category === "Science & Technology") {
    details = `Honoring the scientific milestone, industrial infrastructure, or communication achievements of ${subject}. Located in ${state}, it serves as a testament to the nation's technological progress and is immortalized in postal archives.`;
  } else if (category === "Leaders & Institutions") {
    details = `Dedicated to the administration, education, or national significance of the ${subject} located in ${district}, ${state}. Reflects the institutional strength and public contributions of the organization to the surrounding community.`;
  } else {
    details = `A celebration of the unique local history and folklore of ${subject} in ${state}. It captures the traditional identity, craft, or historical character of the area, making it a valuable postmark for collectors worldwide.`;
  }

  return {
    id,
    state,
    district,
    poName,
    pincode,
    subject,
    category,
    introDate,
    status,
    motif,
    details
  };
});

// Write to files
const outputPath = path.join(__dirname, "../data/cancellations.json");
fs.writeFileSync(outputPath, JSON.stringify(cancellations, null, 2), "utf8");

console.log(`Successfully parsed and wrote ${cancellations.length} pictorial cancellations to: ${outputPath}`);
