CREATE SEQUENCE public.question_question_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.question ALTER COLUMN question_id SET DEFAULT nextval('public.question_question_id_seq');
ALTER SEQUENCE public.question_question_id_seq OWNED BY public.question.question_id;

CREATE SEQUENCE public.answer_answer_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.answer ALTER COLUMN answer_id SET DEFAULT nextval('public.answer_answer_id_seq');
ALTER SEQUENCE public.answer_answer_id_seq OWNED BY public.answer.answer_id;

CREATE SEQUENCE public._user_user_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public._user ALTER COLUMN user_id SET DEFAULT nextval('public._user_user_id_seq');
ALTER SEQUENCE public._user_user_id_seq OWNED BY public._user.user_id;

CREATE SEQUENCE public.theme_theme_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.theme ALTER COLUMN theme_id SET DEFAULT nextval('public.theme_theme_id_seq');
ALTER SEQUENCE public.theme_theme_id_seq OWNED BY public.theme.theme_id;

CREATE SEQUENCE public.test_test_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.test ALTER COLUMN test_id SET DEFAULT nextval('public.test_test_id_seq');
ALTER SEQUENCE public.test_test_id_seq OWNED BY public.test.test_id;



insert into _user(email, enabled, first_name, last_name, middle_name, password, type, user_name) VALUES ('m1@m.r', true, 'user1', 'user1', 'user1', '123456', 'STUDENT', 'user1');
insert into user_roles(username, role) VALUES ('user1', 'USER');
insert into _user(email, enabled, first_name, last_name, middle_name, password, type, user_name) VALUES ('m2@m.r', true, 'admin1', 'admin1', 'admin1', '123456', 'STUDENT', 'admin1');
insert into user_roles(username, role) VALUES ('admin1', 'ADMIN');

insert into theme(theme_id, name) VALUES (1, 'Тема 1');
insert into test(test_id, author_id, date, name, theme_id, time_to_test) VALUES (1, 1, now(), 'Тест1', 1, 30);

insert into question(question_id, date, test_id, text, type) VALUES (1, now(), 1, 'Лингвистическое обеспечение это', 1);
insert into answer(answer, correct, question_id) VALUES ('совокупность технических средств, используемых в автоматизированного проектировании', false, 1);
insert into answer(answer, correct, question_id) VALUES ('проблемно-ориентированные языки, предназначенные для описания процедур автоматизированного проектирования', true, 1);
insert into answer(answer, correct, question_id) VALUES ('комплекс регламентирующих документов касаются организационной структуры подразделений, эксплуатирующих САПР', false, 1);
insert into answer(answer, correct, question_id) VALUES ('набор документов, регламентирующих эксплуатацию САПР', false, 1);

insert into question(question_id, date, test_id, text, type) VALUES (2, now(), 1, 'Снижение себестоимости проектирования обеспечивается за счет', 1);
insert into answer(answer, correct, question_id) VALUES ('параллельного проектирования, создания виртуальных конструкторских бюро', false, 2);
insert into answer(answer, correct, question_id) VALUES ('специализированные рабочие места', true, 2);
insert into answer(answer, correct, question_id) VALUES ('автоматизации принятия решений, информационной поддержки принятия ри¬шення, автоматизации оформления документов', false, 2);
insert into answer(answer, correct, question_id) VALUES ('вариантное проектирование и оптимизация, унификация проектных решений', false, 2);

insert into question(question_id, date, test_id, text, type) VALUES (3, now(), 1, 'На какой стадии проектирования рассматриваются аналогичные САПР', 1);
insert into answer(answer, correct, question_id) VALUES ('предпроектного обследования', false, 3);
insert into answer(answer, correct, question_id) VALUES ('технического задания', true, 3);
insert into answer(answer, correct, question_id) VALUES ('технического предложения', false, 3);
insert into answer(answer, correct, question_id) VALUES ('эскизного проекта', false, 3);

insert into question(question_id, date, test_id, text, type) VALUES (4, now(), 1, 'Представление характеризуется', 1);
insert into answer(answer, correct, question_id) VALUES ('целеустремленностью, целостность и членимостью, иерархичнистью, многоаспектностью и развитием', false,  4);
insert into answer(answer, correct, question_id) VALUES ('разделением системы на части и последующим их раздельным исследованием', true,   4);
insert into answer(answer, correct, question_id) VALUES ('описанием системы, выполненное в каком-то аспекте', false,  4);
insert into answer(answer, correct, question_id) VALUES ('совокупностью устойчивых связей между элементами системы', false,  4);

insert into question(question_id, date, test_id, text, type) VALUES (5, now(), 1, 'Группа признаков качества САПР как объекта эксплуатации', 1);
insert into answer(answer, correct, question_id) VALUES ('учитывают качество выполнения отдельной функциональной задачи', false,  5);
insert into answer(answer, correct, question_id) VALUES ('характеризует ее приспособленность к изменениям', true,   5);
insert into answer(answer, correct, question_id) VALUES ('характеризует способности системы к одновременному выполнению всего множества функциональных задач', false,  5);
insert into answer(answer, correct, question_id) VALUES ('отражает свойства САПР с позиций различных составляющих общего процесса эксплуатации', false,  5);

insert into question(question_id, date, test_id, text, type) VALUES (6, now(), 1, 'Группа признаков качества САПР как объекта эксплуатации', 1);
insert into answer(answer, correct, question_id) VALUES ('характеризует ее приспособленность к изменениям', false,  6);
insert into answer(answer, correct, question_id) VALUES ('отражает свойства САПР с позиций различных составляющих общего процесса эксплуатации', true,   6);
insert into answer(answer, correct, question_id) VALUES ('характеризует способности системы к одновременному выполнению всего множества функциональных задач', false,  6);
insert into answer(answer, correct, question_id) VALUES ('учитывают качество выполнения отдельной функциональной задачи', false,  6);

insert into question(question_id, date, test_id, text, type) VALUES (7, now(), 1, 'Какими параметрами оперирует проектировщик в процессе проектирования', 1);
insert into answer(answer, correct, question_id) VALUES ('выходные', false,  7);
insert into answer(answer, correct, question_id) VALUES ('внешние', true,   7);
insert into answer(answer, correct, question_id) VALUES ('внутренние', false,  7);
insert into answer(answer, correct, question_id) VALUES ('технологические', false,  7);

insert into question(question_id, date, test_id, text, type) VALUES (8, now(), 1, 'САD системы решают задачи', 1);
insert into answer(answer, correct, question_id) VALUES ('конструкторского проектирования', false,  8);
insert into answer(answer, correct, question_id) VALUES ('технологического проектирования', true,   8);
insert into answer(answer, correct, question_id) VALUES ('управления инженерными данными', false,  8);
insert into answer(answer, correct, question_id) VALUES ('инженерных расчетов', false,  8);

insert into question(question_id, date, test_id, text, type) VALUES (9, now(), 1, 'Автоматизированное проектирование это', 1);
insert into answer(answer, correct, question_id) VALUES ('процесс постепенного приближения к выбору окончательного проектного решения', false,  9);
insert into answer(answer, correct, question_id) VALUES ('процесс проектирования, происходит при взаимодействии человека с компьютером', true,   9);
insert into answer(answer, correct, question_id) VALUES ('процесс проектирования осуществляется компьютером без участия человеко', false,  9);
insert into answer(answer, correct, question_id) VALUES ('процесс проектирования, происходит без применения вычислительной техники', false,  9);

insert into question(question_id, date, test_id, text, type) VALUES (10, now(), 1, 'На стадии рабочего проекта проводится', 1);
insert into answer(answer, correct, question_id) VALUES                           ('изготовление, наладка и испытание несерийных компонентов САПР', false,  10);
insert into answer(answer, correct, question_id) VALUES                           ('создается подробная рабочая документация по САПР в целом и по ее пид¬систем и компонентов', true,   10);
insert into answer(answer, correct, question_id) VALUES                           ('разрабатываются окончательные решения по созданию САПР, которые согласовываются и утверждаются', false,  10);
insert into answer(answer, correct, question_id) VALUES                           ('осуществляется сдача САПР в промышленную эксплуатацию', false,  10);

insert into question(question_id, date, test_id, text, type) VALUES (11, now(), 1, 'Проектируют подсистемы', 1);
insert into answer(answer, correct, question_id) VALUES                           ('это организационно-техническая система, состоящая из совокупности компле¬ксу средств автоматизации проектирования и коллектива специалистов подразделений проектной организации', false,  11);
insert into answer(answer, correct, question_id) VALUES                           ('выполняют процедуры и операции получения новых данных', true,   11);
insert into answer(answer, correct, question_id) VALUES                           ('обеспечивающих функционирование проектируют подсистем, а также для оформ¬лення, передачи и вывода результатов проектирования', false,  11);
insert into answer(answer, correct, question_id) VALUES                           ('составная часть САПР, обусловлена различными аспектами', false,  11);

insert into question(question_id, date, test_id, text, type) VALUES (12, now(), 1, 'В каких данных негеометричного характера требуют CAE системы', 1);
insert into answer(answer, correct, question_id) VALUES                           ('в описании свойств каждой поверхности детали', false,  12);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах данных инструментов и приспособлений', true,   12);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах размеров нормализованных деталей и сборочных единиц, вклю¬чаючы возможность создания собственных библиотек элементов конструкции', false,  12);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах физико-механических свойств материалов', false,  12);

insert into question(question_id, date, test_id, text, type) VALUES (13, now(), 1, 'На какой стадии проектирования разрабатываются приложения для решения функциональных и технологических задач САПР и оформление всей документации', 1);
insert into answer(answer, correct, question_id) VALUES                           ('ввод в эксплуатацию', false,  13);
insert into answer(answer, correct, question_id) VALUES                           ('создание нестандартных компонентов', true,   13);
insert into answer(answer, correct, question_id) VALUES                           ('технического проекта', false,  13);
insert into answer(answer, correct, question_id) VALUES                           ('рабочего проекта', false,  13);

insert into question(question_id, date, test_id, text, type) VALUES (14, now(), 1, 'Какие стадии выполняются на этапе научно-исследовательских работ', 1);
insert into answer(answer, correct, question_id) VALUES                           ('испытания и ввод в действие', false,  14);
insert into answer(answer, correct, question_id) VALUES                           ('эскизный и технический проекты', true,   14);
insert into answer(answer, correct, question_id) VALUES                           ('предпроектных исследований и технического задания', false,  14);
insert into answer(answer, correct, question_id) VALUES                           ('стадии рабочего проекта, изготовление, наладка', false,  14);

insert into question(question_id, date, test_id, text, type) VALUES (15, now(), 1, 'Комплексные САПР', 1);
insert into answer(answer, correct, question_id) VALUES                           ('ориентированы на приложения, где основной процедурой проектирования является конструирования', false,  15);
insert into answer(answer, correct, question_id) VALUES                           ('состоят из совокупности различных подсистем', true,   15);
insert into answer(answer, correct, question_id) VALUES                           ('ориентированные на приложения, в которых при сравнительно несложных математических расчетах перерабатывается большой объем данных', false,  15);
insert into answer(answer, correct, question_id) VALUES                           ('это автономно используемые программно-методические комплексы', false,  15);

insert into question(question_id, date, test_id, text, type) VALUES (16, now(), 1, 'Какие параметры используются в процессе проектирования', 1);
insert into answer(answer, correct, question_id) VALUES                           ('технологические, технические, экономические', false,  16);
insert into answer(answer, correct, question_id) VALUES                           ('внутренние, экономические, технологические', true,   16);
insert into answer(answer, correct, question_id) VALUES                           ('выходные, производственные, технологические', false,  16);
insert into answer(answer, correct, question_id) VALUES                           ('внешние, внутренние, выходные', false,  16);

insert into question(question_id, date, test_id, text, type) VALUES (17, now(), 1, 'САПР это', 1);
insert into answer(answer, correct, question_id) VALUES                           ('автоматизированная система управления производством', false,  17);
insert into answer(answer, correct, question_id) VALUES                           ('автоматизированная система управления предприятием', true,   17);
insert into answer(answer, correct, question_id) VALUES                           ('автоматизированная система управления технологическим оборудованием', false,  17);
insert into answer(answer, correct, question_id) VALUES                           ('организационно-техническая система, взаимосвязанная с подразделениями проектной организации', false,  17);

insert into question(question_id, date, test_id, text, type) VALUES (18, now(), 1, 'На этапе технологической подготовки производства решаются следующие задачи', 1);
insert into answer(answer, correct, question_id) VALUES                           ('инженерные расчеты и проектирование 3D моделей', false,  18);
insert into answer(answer, correct, question_id) VALUES                           ('проектирования технологических процессов проектирования управляющих программ и технологической оснастки', true,   18);
insert into answer(answer, correct, question_id) VALUES                           ('проектирования 3D моделей и чертежей изделия', false,  18);
insert into answer(answer, correct, question_id) VALUES                           ('конструирования изделий и разработка управляющих программ', false,  18);

insert into question(question_id, date, test_id, text, type) VALUES (19, now(), 1, 'Повышение качества проектирования обеспечивается за счет', 1);
insert into answer(answer, correct, question_id) VALUES                           ('параллельного проектирования, создания виртуальных конструкторских бюро', false,  19);
insert into answer(answer, correct, question_id) VALUES                           ('автоматизации принятия решений, информационной поддержки принятия решения, автоматизации оформления документов', true,   19);
insert into answer(answer, correct, question_id) VALUES                           ('специализированные рабочие места', false,  19);
insert into answer(answer, correct, question_id) VALUES                           ('вариантное проектирование и оптимизация, унификация проектных решений', false,  19);

insert into question(question_id, date, test_id, text, type) VALUES (20, now(), 1, 'Сложные технические системы характеризуются следующими качествами', 1);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность устойчивых связей между элементами системы', false,  20);
insert into answer(answer, correct, question_id) VALUES                           ('разделение системы на части и последующим их раздельным исследованием', true,   20);
insert into answer(answer, correct, question_id) VALUES                           ('целеустремленностью, целостность и членимость, иерархичнистю, багатоаспективность и развитием', false,  20);
insert into answer(answer, correct, question_id) VALUES                           ('описание системы, выполненное в каком-то аспекте', false,  20);

insert into question(question_id, date, test_id, text, type) VALUES (21, now(), 1, 'Группа признаков качества выполнения основных функций САПР', 1);
insert into answer(answer, correct, question_id) VALUES                           ('отражает свойства САПР с позиций различных составляющих общего процесса эксплуатации', false,  21);
insert into answer(answer, correct, question_id) VALUES                           ('характеризует ее приспособленность к изменениям', true,   21);
insert into answer(answer, correct, question_id) VALUES                           ('характеризует способности системы к одновременному выполнению всего множества функциональных задач', false,  21);
insert into answer(answer, correct, question_id) VALUES                           ('учитывают качество выполнения отдельной функциональной задачи', false,  21);

insert into question(question_id, date, test_id, text, type) VALUES (22, now(), 1, 'В каких данных негеометричного характера требуют CAPP системы', 1);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах размеров нормализованных деталей и сборочных единиц, включая возможность создания собственных библиотек элементов конструкции', false,  22);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах физико-механических свойств материалов', true,   22);
insert into answer(answer, correct, question_id) VALUES                           ('в таблицах данных инструментов и приспособлений', false,  22);
insert into answer(answer, correct, question_id) VALUES                           ('в описании свойств каждой поверхности детали', false,  22);

insert into question(question_id, date, test_id, text, type) VALUES (23, now(), 1, 'На стадии технического проекта выполняется', 1);
insert into answer(answer, correct, question_id) VALUES                           ('изготовление, наладка и испытание несерийных компонентов САПР', false,  23);
insert into answer(answer, correct, question_id) VALUES                           ('создается подробная рабочая к документации по САПР в целом и по ее подсистем и компонентов', true,   23);
insert into answer(answer, correct, question_id) VALUES                           ('осуществляется сдача САПР в промышленную эксплуатацию', false,  23);
insert into answer(answer, correct, question_id) VALUES                           ('разрабатываются окончательные решения по созданию САПР, которые согласовываются и утверждаются', false,  23);

insert into question(question_id, date, test_id, text, type) VALUES (24, now(), 1, 'Какая из указанных систем предназначена для управления инженерными данными', 1);
insert into answer(answer, correct, question_id) VALUES                           ('Вертикаль', false,  24);
insert into answer(answer, correct, question_id) VALUES                           ('Компас-менеджер', true,   24);
insert into answer(answer, correct, question_id) VALUES                           ('Cosmos', false,  24);
insert into answer(answer, correct, question_id) VALUES                           ('SolidWorks', false,  24);

insert into question(question_id, date, test_id, text, type) VALUES (25, now(), 1, 'Технико-экономические показатели сложной технической системы это', 1);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность используемых для достижения эффекта финансовых, материальних, трудовых и временных ресурсов', false,  25);
insert into answer(answer, correct, question_id) VALUES                           ('изменение результатов процесса проектирования при замене неавтоматизированного способа его исполнения автоматизированным', true,   25);
insert into answer(answer, correct, question_id) VALUES                           ('составляющие эффекта, имеют техническое и экономическое выражение', false,  25);
insert into answer(answer, correct, question_id) VALUES                           ('сопоставления эффекта от применения САПР и полных затрат на ее создание и эксплуатацию', false,  25);

insert into question(question_id, date, test_id, text, type) VALUES (26, now(), 1, 'Процессное представление дает пониманием системы как', 1);
insert into answer(answer, correct, question_id) VALUES                           ('технологической системы, то есть перерабатывающей некий «предмет труда»', false,  26);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность взаимосвязанных процессов, проходящих по мере своего течения через ряд состояний, отделяя друг от друга этапы движения системы', true,   26);
insert into answer(answer, correct, question_id) VALUES                           ('информацию о строении системы, которая рассматривается как совокупность связанных элементов, являющихся средствами для выполнения основных функций системы', false,  26);
insert into answer(answer, correct, question_id) VALUES                           ('совокупности взаимосвязанных функций, то есть действий, необходимых для достижения поставленных перед системой целей', false,  26);

insert into question(question_id, date, test_id, text, type) VALUES (27, now(), 1, 'При управлении инженерными данными', 1);
insert into answer(answer, correct, question_id) VALUES                           ('расчеты на прочность', false,  27);
insert into answer(answer, correct, question_id) VALUES                           ('проектирования 3D моделей и чертежей изделия', true,   27);
insert into answer(answer, correct, question_id) VALUES                           ('проектирования технологических процессов и управляющих программ', false,  27);
insert into answer(answer, correct, question_id) VALUES                           ('управления документооборотом', false,  27);

insert into question(question_id, date, test_id, text, type) VALUES (28, now(), 1, 'Свойство сложной системы целеустремленность определяет', 1);
insert into answer(answer, correct, question_id) VALUES                           ('различные группы свойств системы', false,  28);
insert into answer(answer, correct, question_id) VALUES                           ('целостность образования, состоящая из связанных между собой элементов', true,   28);
insert into answer(answer, correct, question_id) VALUES                           ('цели, для которой создается система', false,  28);
insert into answer(answer, correct, question_id) VALUES                           ('способность изменять свои функции, структуру, внутренние про ¬ процессы на протяжении всего жизненного цикла', false,  28);

insert into question(question_id, date, test_id, text, type) VALUES (29, now(), 1, 'Какой из представленных вариантов не является разновидностью системного подхода к проектирования', 1);
insert into answer(answer, correct, question_id) VALUES                           ('структурный подход', false,  29);
insert into answer(answer, correct, question_id) VALUES                           ('технологический подход', true,   29);
insert into answer(answer, correct, question_id) VALUES                           ('объектно-ориентированный подход', false,  29);
insert into answer(answer, correct, question_id) VALUES                           ('блочно-иерархический подход', false,  29);

insert into question(question_id, date, test_id, text, type) VALUES (30, now(), 1, 'В чем суть принципа развития при создании САПР', 1);
insert into answer(answer, correct, question_id) VALUES                           ('обеспечивает совместное функционирование составных частей САПР и сохраняет открытую систему в целом', false,  30);
insert into answer(answer, correct, question_id) VALUES                           ('обеспечивает целостность системы и иерархичность проектирования отдельных елементов и всего объекта проектирования', true,   30);
insert into answer(answer, correct, question_id) VALUES                           ('ориентирует на преимущественное создание и использование типовых и унифицированных элементов САПР', false,  30);
insert into answer(answer, correct, question_id) VALUES                           ('обеспечивает пополнение, совершенствование и обновление составных частей САПР', false,  30);

insert into question(question_id, date, test_id, text, type) VALUES (31, now(), 1, 'Программное обеспечение это', 1);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность технических средств, используемых в автоматизированном проектировании', false,  31);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность компьютерных программ предназначенных для автоматизированного проектирования', true,   31);
insert into answer(answer, correct, question_id) VALUES                           ('совокупность данных, размещениях на различных носителях информации, которые використо¬вуються для проектирования', false,  31);
insert into answer(answer, correct, question_id) VALUES                           ('алгоритмы, по которым розробляться программное обеспечение САПР', false,  31);

insert into question(question_id, date, test_id, text, type) VALUES (32, now(), 1, 'Свойство сложной системы целостность и членимость определяет', 1);
insert into answer(answer, correct, question_id) VALUES                           ('цели, для которой создается система', false,  32);
insert into answer(answer, correct, question_id) VALUES                           ('целостность образования, состоящая из связанных между собой элементов', true,   32);
insert into answer(answer, correct, question_id) VALUES                           ('способность изменять свои функции, структуру, внутренние про ¬ процессы на протяжении всего жизненного цикла', false,  32);
insert into answer(answer, correct, question_id) VALUES                           ('различные группы свойств системы', false,  32);


-- ASU

CREATE SEQUENCE public.equipment_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.equipment ALTER COLUMN id SET DEFAULT nextval('public.equipment_id_seq');
ALTER SEQUENCE public.equipment_id_seq OWNED BY public.equipment.id;

CREATE SEQUENCE public.asu_element_id_seq NO MINVALUE NO MAXVALUE NO CYCLE;
ALTER TABLE public.asu_element ALTER COLUMN id SET DEFAULT nextval('public.asu_element_id_seq');
ALTER SEQUENCE public.asu_element_id_seq OWNED BY public.asu_element.id;

insert into equipment(name) VALUES ('Гидравлическое оборудование');
insert into equipment(name) VALUES ('Колесное шасси Маз-543');


insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Насосы шестеренчатые',	0.000013000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Насосы аксильно-поршневые нерегулируемые',	0.000009000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Насосы с механическим приводом',	0.000008740);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Насосы с электрическим приводом',	0.000008700);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Гидравлические двигатели',	0.000004300);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Силовые гидравлические цилиндры',	0.000000008);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Регуляторы давления',	0.000004250);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Гидравлические клапаны',	0.000005000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Обратные клапаны',	0.000005700);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Предохранительные клапаны',	0.000005700);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Запорные клапаны',	0.000006700);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Рапределители плунжерного типа',	0.000000540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Арматура трубопроводов (тройники, крестовины и др)',	0.000002900);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Соединения трубопроводов',	0.000030000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Уплотнители для вращающихся валов',	0.000000700);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Уплотнители для поступательно движущихся элементов',	0.000000300);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Гидравлическое оборудование'),	'Фильтры',	0.000000790);


insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Рукава высокого давления с металлической оплеткой',	0.000002000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Картер',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Кривошнипно-шатунный механизм',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Блок цилиндров',	0.000050000);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Прокладка',	0.000037540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Коленчатый вал',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Нарушение уплотнения коленвала',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Шатунно-поршневая группа',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Механизм газораспределения',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Механизм передач',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система питания ходового двигателя топливом',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- топливный бак (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- топливораспределительный кран',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- ручной топливоподкачивающий насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- фильтр грубой очистки',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- фильтр тонкой очистки (засорение)',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- топливный насос высокого давления',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- форсунки',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- бачок слива топливо',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- топливопровод высокого и низкого давлений',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система питания ХД воздухом',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система выпуска отработанных газов',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система смазывания',	0.000062560);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- в том числе по причине попадания охлаждающей жидкости и стружки в систему смазывания',	0.000025030);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- большой расход масла',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- масляный бак',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- электромаслозакачивающий насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- по причине падения давления масла',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- фильтр',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- радиатор охлаждения масла (утечки масла)',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- перепускной клапан радиатора',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- трубопроводы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система охлаждения',	0.000037540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- циркуляционный насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- радиатор',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- вентиляторы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- трубопроводы (подтекание антифриза)',	0.000025030);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система воздушного пуска ходового двигателя',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система предпускового разогрева',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- воздушно-форсуночная горелка',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- котел подогревателя',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- электромагнитный клапан',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- насосный агрегат',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- щиток управления',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- трубопроводы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Колеса и шины по причине негерметичности сальника колеса',	0.000025030);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Колеса и шины по прочине попадания воздруха в ступицу',	0.000037540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система центральной накачки шин',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Подвеска',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Амортизатор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Рама лонжерного типа',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Управление шасси',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- редуктор руля',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- рулевой механизм',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- распределитель',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- гидроусилитель (вытекло масло):',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- масляный бак',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- трубопроводы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- продольные тяги',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- предохранительный клапан',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- кронштейны рычагов и рулевых трапеций',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Тормозная система',	0.000125130);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Ножной (колесный) тормоз (тормозные колодки):',	0.000062570);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- компрессор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- влагомаслоотделитель',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- регулятор давления',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- воздушный ресивер (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- кран отбора воздуха',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- буксирный клапан',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- тормозной кран',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- подпедальный цилиндр тормоза',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- главный тормозной цилиндр (2 шт.)',	0.000062570);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- в том числе по причине травления воздуха',	0.000050050);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- утечки охлаждающей жидкости',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- кран дополнительного стояночного тормоза',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- компенсатор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- колесный цилиндр',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- дополнительный тормозной кран',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- клапан переключения',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- стояночный тормоз',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система электрооборудования',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Источники электроэнергии:',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- аккумуляторные батареи',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- генератор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Гидромеханическая передача (ГМП)',	0.000037540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- гидротрансформатор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- трехскоростная планетарная коробка передач',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- гидравлическая система ГМП (подтекание масла)',	0.000037540);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- механизм управления ГМП',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- механизм плавного включения',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- насос гидротрансформатора',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- откачивающий насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- передний насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- масляный бак ГМП',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- масляный фильтр тонкой очистки',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- масляный фильтр гидротрансформатора',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Система охлаждения ГМП',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- водомасляный радиатор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- радиатор системы охлаждения',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- циркуляционный насос',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- вентилятор',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- гидравлический привод вентилятора и циркуляционного насоса (утечка антифриза на валу)',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Механическая трансмиссия',	0.000050050);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- демпферное соединение',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'-повышающая передача:',	0.000050050);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'синхронизатор',	0.000012510);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- раздаточная коробка:',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'кран управления',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- пневматический переключатель передач',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- включатель блокировки дифференциала',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- ручной привод переключения передач',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- контактное устройство контрольной лампы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Карданные валы силовой передачи:',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- карданный вал гидротрансформатора',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- промежуточный карданный вал',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- карданные валы привода передних и задних мостов (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- межмостовые карданные валы (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Ведущие мосты',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- непроходной центральный редуктор (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- проходной центральный редуктор (2 шт.)',	0.000004340);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- межколесный дифференциал задних центральных редукторов',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- межосевой дифференциал центрального проходного редуктора',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- полуосевые карданы и шарниры равных угловых скоростей',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- колесная передача',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Ходовая часть',	0.000062570);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- поворотное устройство',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'- ступицы колес (8 шт.)',	0.000001080);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Контрольно-измерительные приборы',	0.000008670);
insert into asu_element(equipment_id, name, intensity) VALUES ((select id from equipment where name = 'Колесное шасси Маз-543'),	'Приборы освещения и сигнализации (перегорают лампочки)',	0.000012510);


