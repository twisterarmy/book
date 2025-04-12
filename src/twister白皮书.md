## twister 白皮书 （中文翻译）

twister - 一个P2P的微博平台

Miguel Freitas

### 摘要
这篇白皮书提出了一种新的基于P2P网络覆盖层的微博架构。该平台由三种完全独立的网络覆盖层组成。
第一个网络覆盖层提供分布式的用户注册和验证，基于比特币协议。第二个是分布式的哈希表网络覆盖层，用
来存储第三个网络覆盖层中用到的用户资源和tracker位置的键值。最后一层网络层是粉丝swarms的可能的解体，
基于BT协议，这个可以用来实现向多用户有效地发送近点通知。通过融合一些已经存在和验证过的技
术，twister提供了一种新的微博平台，能够提供安全，可伸缩和私密的特性。并有一种机制能给贡献处理时间来
运行用户注册的网络实体以激励，奖励它们向整个网络发送一条推送（“”广告”）消息的特权。一天推送消息
的数量以不使用户厌烦为基准。

### 1 介绍
微博平台是当今互联网上最多元和最有影响力的技术之一。最近的事件显示了这些工具对新闻传播以及政治
运动，如中东的‘阿拉伯之春’运动的重要作用。尽管它们在社会革命中的作用不应该被过分夸大，但这是一个示范
可以让我们去了解为什么独裁政权经常试图关闭互联网以控制这些可能的颠覆运动。然而阻止对互联网的访问，从
来不能完全有效地抵抗社会运动，因为人们总是能找到途径突破这些封锁。

社交服务提供商可能会乐意参与对社交媒体的封锁，相对于仅仅封锁一些网络主干“backbones”，这种可能性更
加可能影响人们以更生动的方式进行沟通的能力。随着我们社会对这些服务依赖的增加，这些基本的交流平台的
任何一点失败，不仅是不能接受的，更是直接违背了互联网设计的关键特性：为信息传输提供冗余。

有关大公司配合的大范围的互联网监听活动的报告，揭示出这些平台侵犯用户隐私的危险。这种一个实体只要他们
愿意就可以访问用户私人交流和个人信息事实应该引起任何的人的担心，只要他认真想一想的话。 一份当前的
House of Lords（UK)的报告公开指出这种大规模监听的危险。

所有这些因素指出了一个明显的方向：现在迫切需要开放，安全和分布式的个人交流平台。这就是当前这个P2P
微博平台提议适合的地方。
当然，要想成功，这些P2P微博平台不能仅提供灵活性和安全性，它还必须对用户友好。这是发展任何新的
软件和网络服务的关键。 当前一些P2P信息提议给这种不知道怎么做用户友好提供了例子，例如要求用户记住一个
模糊的36位大小写敏感的字母组成的地址。
能提供用户一个容易记忆的用户登录必须被当作一个关键需求考虑。当用户必须自由的选择他们的登录名，给那些
想要自由表达而不用担心被报复，认识到这点很重要，在这些微博架构上建立一个可信任的网络取决于这些真实
存在且完全可辨认的人。这个问题可以在Hudson坠机新闻中体会出来，那里受信任的aggregator帮助将可靠的
信息从随机的噪声中分离出来。这些在信息传输中像hub一样工作的人，经常被定义为”influential”。
任何严肃的P2P微博提议都必须培育这种类型的组织。

这份白皮书阐述了一个新的P2P微博平台提议，一个关于可扩展，有灵活性的面对失败和攻击，不需要依赖任何中心认
证中心来进行用户注册，提供易于使用的加密了的私密交流和认证过的公开帖子。该架构试图尽可能融合几种已有
的且验证过的P2P技术，比如BT和比特币。私密性同样是主要的设计考量，应该没有人能看到用户的IP或他们粉丝
，除非他们明确分享这些信息。

提议的平台由三个非常独立的覆盖层网络组成。第一个基于比特币协议，提供分布式的用户注册和认证功能。
第二个是一个分布式的哈希表覆盖层网络，用于第三个网络中用到的用户资源和tracker位置的键/值存储。最后
一个基于BT协议，是粉丝“swarms”的可能的分离的集合，可以被用来进行有效的多用户近点通知的发送。

### 2 相关工作
现有的社交网络如Daspora，StatusNet和identi.ca，经常作为Facebook和Twitter的分布式的，自由的替
代品被提及。 这些平台是基于”联合社交网站“的概念，用户可以选择加入这些社交网站，而这些网站通过开放的
协议彼此之间相互通讯。当为了获得更好的隐私控制而专门地选择某个单一的，封闭的平台，用户还是要把他们
自己的数据交给第三方（除非他想设置他自己的服务器来联合）。

以前也有P2P的微博平台提案，像Cucko[12]和Megaphone[13].Cucko和Megaphone看起来都不是为了解决
分布式用户注册的问题。隐私同样不是Cucko的目标之一，因为它直言设计用来了解任何用户的线上状态的。
twister和Cucko的一个共同点是都使用一个非结构的覆盖层网络来进行用户帖子的传播的思路，不像Megaphone
所有粉丝必须注册到Sender，形成一个多点传输树来进行帖子的传播。

一个更高级的社交网络提议Safebook瞄准好几个隐私问题，通过实现不同的层级（”shells“）来访问发布的
数据。Safebook的目标范围比twister大得多，它同样依赖一个中心化的受信任的识别服务用于用户的注册。

目前为止，这些P2P提议似乎都没有公开的实现。

### 3 标注
元组：[a, b, c, ...]

应用函数f到 payload x:y = f(x)

用户j的地址： IDj = H(Username<sub>j</sub>); 其中H是个hash函数

用户j的公开密钥和私人密钥： PUBK<sub>j</sub>; PRIVK<sub>j</sub>

备注：PUBK（PRIVK（x））=x, PRIVK(PUBK(y))=y

用户j的签名内容x：SIGj(x)=[PRIVK<sub>j</sub>(H(x)),x]

### 4 P2P网络的用户注册
去中心化的且安全的用户注册功能已经通过块链机制得以实现，这种机制被比特币用来在不需要中心认证的情况下，
解决”重复发送“问题。提议中的系统这个机制用来保证用户的唯一性，同样不需要中心认证。新的注册在被认为
确认是一个特定的用户前，必须被一系列的块“notarized”。每一个块被这样定义：

   Block<sub>i</sub> = [i, H(Block<sub>i-1</sub>),Nonce<sub>i</sub>, SpamMsg<sub>i</sub>,[UserReg<sub>j</sub>, UserReg<sub>j+1</sub>,...]]

H（Block<sub>i</sub>）凭借部分哈希碰撞（通过野蛮地强制在Nonce<sub>i</sub>空间上搜索），产生工作证（POW）。困难在于网络
如何基于每小时块产生的平均数来自动设置（和比特币一样）。
UserReg<sub>j</sub> = [Username<sub>j</sub>, PUBK<sub>j</sub>, Nonce<sub>j</sub>]

当一个新用户注册到网络，在他的请求被重发和接受之前，他必须广播UserRegj。其他节点，根据收到的UserReg<sub>j</sub>
必须通过一个部分哈希碰撞H(UserReg<sub>j</sub>）来检查POW。这个工作证可阻止DoS攻击，因为通过伪造注册的泛洪flooding。

UserReg<sub>j</sub>的POW比块链的POW小得多，通常只是几分钟的平均电脑时间（可能可能是写进代码并仅仅随着协议版
本改变）。

块链提供了公开的从Username<sub>j</sub>（或ID<sub>j</sub>）到PUBK<sub>j</sub>的字典。

在将UserRegj包含进一个新块之前，节点必须强制执行Username<sub>j</sub>的唯一性。该规则唯一的例外是密码替换的
情况，新的公开密钥由以前已知的密钥对签名。ID<sub>j</sub>和UsrReg<sub>j</sub>的POW的唯一性的强制检查也应用在接收新块的
时候，因为所有的注册包括其自身都必须被检查。

Username<sub>j</sub>同样受一些额外文本规则的限制，比如最大长度和允许的字符。这些更好地保护了ID空间免受部分哈希
碰撞攻击，相反的，也意味着容易被监视（监听，见章节12）。

SpamMsg<sub>i</sub>是一个必须被所有客户端显示的非请求消息（通常委婉地称做推广信息），提供了加入块链产生运动
的一个激励。如果一比特币块产生的相同速率（每小时6块），显示的一个可能性因子可能按不使用户看到太多广
告而厌烦为标准。

开发者千万不能开发隐藏广告信息的功能来作为他们的客户端特性，因为这个奖励对整个网络的安全起到重要作用。
从客户端软件中删除非请求信息只会伤害用户。显示可能性因子可以被实现，同样，客户端软件可以调整本地
化的优先级（通过给和用户同样语言的信息更高的可能性）来提高效率和用户体验。


### 5 可路由的DHT网络覆盖层
第二个P2P网络是一个结构化的分布式哈希表覆盖层网络，类似Kademlia[16]。这个网络唯一最重要的功能
是允许peer存储和获取资源。直接投递用户间提醒可以被算作第二个用途（见章节7）。

直接使用IDj作为端的地址加入DHT网络是冒险的，因为这会允许简单的条件反射认证，可能会阻止ID伪造。在
P2P/DHT网络中，伪造的ID地址是毋庸置疑的最严重的安全问题（参考Sybil和Eclipse攻击[17][18]）。
使用ID<sub>j</sub>作为DHT的地址会极大地危害隐私，因为这种网络的一个根本特性就是通过了解其他节点的IDs来建立优化路由表的。
ID<sub>j</sub>不仅能轻易侦测用户的在线活动，而且还可能暴露用户的IP地址。
相对于ID<sub>j</sub>，提案中使用用IP地址和端口号进行哈希运算的标准进程来加入DHT网络：
ID<sub>node_j</sub> = H（[IP<sub>j</sub>，port]）。

在[19]中，显示了限制到每次活动中，从外部IP到ID的安全映射是防攻击的。
这个DHT网络中从IDsrc发送到IDdst的数据包，其定义如下：
Package = [ID<sub>dst</sub>, ID<sub>src</sub>, SIG<sub>j</sub>(payload), ID<sub>j</sub>)]
payload由给定的用会ID<sub>j</sub>签名，甚至在信息被转发或刷新的情况下，它都可能和发送者ID<sub>src</sub>不一样。

这些由这个覆盖层网络所提供的特性组成了“第三层”的基本功能。
在提议的DHT覆盖层网络概念模型中，向上走有一层通过数据存储术语（PUT）操作的“应用层”，，用下面的负载
粗略定义：

payload<sub>PUT</sub> = [target, value, time, seq] ，
其中target = [owner, resource, restype] ，ID<sub>dst</sub> = H（target）

为了接受存储请求，目标节点必须检查一些简单的规则：
1. ID<sub>dst</sub> = H（target）：确保目标地址是被合理地计算生成的。
2. ID<sub>dst</sub> 是那个实际接收请求的ID<sub>node</sub>的邻居。（通过一些共同同意的测定方法）
3. ID<sub>j</sub> = H（owner），仅仅强制 restype = "single"
4. seq比之前储存的seqold大，仅仅强制要求 restype = "single"
5. 时间是一个有效的时间（比如，不能是未来）

restype两种可能的值是”single“和”multi”。这两种类型相应地提供，仅仅可以被该密钥所有者更新的内容
（如用户头像），或集合了不同用户的多条回应的资源（如对特定帖子的回复）。在“sigle”的情况下，节点仅仅
保存公开密钥IDdst相对应的一个内容。而在”multi“状况下，新的PUT请求被附加到一系列的内容上。这种类
型的存储不提供任何的保证，内容可能会根据失效条件（基于时间field）或”最小当前使用（LRU）”缓存策略而
被舍弃。认证过的（“single”）存储优先于任何前面的”multi”内容。

数据检索操作符（GET）可以不加区分地操作这两种类型的资源。一些特殊的与动态内容相关的非存储资源也
可以使用相同的操作符来进行操作，同样共享相同的API。

### 6 用户帖子
用户j的第k个帖子被定义如下：

UserPost<sub>jk</sub> = SIG<sub>j</sub>([Username<sub>j</sub>, k, type, MSG<sub>k</sub>, REPLY<sub>k</sub>])

其中MSGk是帖子的内容（限制最多140字符），k是一个递增的数字， type可以定义这是一个新帖子，或是
回复，或是转发（RT），或者私信（DM）。REPLYk是一个可选的字段，提供了一个到原始帖子的指针引用，在回
复或转发（RT）（参考章节8）情况下，定义为一个元组REPLY<sub>k</sub> =[Username<sub>j'</sub>,k']，其中原始帖子是用户
j‘的第k’条帖子。

帖子在两层网络覆盖层中同步共享：（1）作为DHT网络中的存储内容，可能只存在较短时间；（2）从属于某种
BT网络的类似文件的存档。当创建一个新帖子的时候，客户端软件必须发送两个PUT请求到以下地址：

ID<sub>UserPost_jk</sub> = H ([Username<sub>j</sub>,"post"+k,"single"])， 和

ID<sub>swarm_j</sub> = H ([Username<sub>j</sub>,"swarm","single"])。

ID<sub>UserPost_jk</sub>是一个存储目标的地址，在章节5中有定义，同时提供任意帖子的获取能力。

ID<sub>swarm_j</sub>是一个能访问种子文件 swarm的特别的网关地址（在BT术语中[20]）。这些种子文件可能包含
指定用户j的所有帖子，并协助在DHT网络中独立地共享它们。IDswarm_j的邻居被要求加入这个swarm，
尽可能多的ID<sub>UserPost_jk</sub>的邻居被要求存储这些内容。DHT-种子文件 的交互规则在章节7.2中有进一步的
详细说明。

新帖分发的swarm机制修复了新帖提醒的效率问题，避免了粉丝们轮询一个DHT网络中特定地址的需要。这是一个
有同样问题（“lame，重复轮询”）的不同解决方案，该问题由pubsubhubbub协议后面的开发者引起。

#### 6.1 私信
如果接收者是用户k的粉丝的话（和Twitter的要求一样），用户帖子同样可被用来发送私信（DM）。

UserPost（j->l)k, = SIG<sub>j</sub>(["",k,"dm",[PUBKl(DM<sub>k</sub>),H(DM<sub>k</sub>)]])

大家应该注意到DM与一个普通的帖子是一样的，除了用[PUBK<sub>l</sub>（DM<sub>k</sub>),H(DM<sub>k</sub>)]
替代了上面一般公开帖子中的负载。
通过检查解密是否成功，DM只会被目标用户l接收到。没有其他用户会知道DM的接收者是谁，尽管加密过的信息
会被所有他的粉丝看到。

这个关于DM加密机制的简陋说明仅仅是想用来解释这个概念，而实际的实现可能会不同。当前，这个工作的twister
原型基于ECIS（Elliptic Curve Integrated Encryption Scheme），是由Ladar Levison[22]
（Lavabit加密邮箱服务以前的拥有者）开发的，推测会符合 SECG SEC1标准。

#### 6.2 用户帖子 种子文件/tracker规则
- ID<sub>swarm_j</sub>哈希空间中特定距离内的在线邻居，被要求加入（或创建）swarm。
- 当某个ID<sub>swarm_j</sub>的邻居从DHT网络中接收到一个新帖子，他必须像网关一样工作，把帖子合并成一个可在BT
网络中分享的类似文件的结构。
- BT tracker是一个特殊的可读的多值列表存储，可通过公式
ID<sub>tracker_j</sub>=H([Username<sub>j</sub>, "tracker","multi"])寻址。
- 用户j的粉丝必须加入swarm来接收实时的更新。他们通过查询(GET操作)ID<sub>trackj</sub>来获得一个
初始点的列表的方式来完成这个工作。
- ID<sub>track_j</sub>与其他存储键不同的是它的只读属性。这是一个安全措施用来防止tracker污染，同时用来保护
swarm成员的隐私。因此IP地址列表是从swarm协议自身（BT）得到的，而不是从DHT网络以可读写的方式产生。
这增加了一个额外的要求：ID<sub>track_j</sub>的在线邻居也被要求加入swarm。
- swarm成员之间只能通过IP地址了解其他成员。这个类似BT的网络务必不提供任何有关用户名的线索。
- 这里不需要一个关于所有帖子的哈希表（比如，种子文件的块校验），因为所有帖子（包括私信）已经被
签名并且可以被验证。
- k值的增加（新帖子）是由swarm内部的广播直接传播的（flooding）。
- swarm成员相互之间交换可见帖子的位列表。成员可以选择仅保存/请求最近发的帖子。
- Seeders是志愿成为档案保管员的节点。
- 发帖者（用户j）可以选择不作为自己swarm的成员（为了隐私目的，保护他的IP）。
- 如果发帖者选择成为自己swarm的成员，他可能跳过了整个ID<sub>swarm_j</sub>网关的算法，会损失一些IP隐私。
- 即使发帖者是自己swarm的成员，他也不需要成为seeder。
- 在BT术语中，存在的pieces的数量必须通过新帖子增加到k。这通过发送一个（非请求）“有”的消息来实现。
- 客户端必须把”有“消息的参数当作新pieces的数量来对待。为了防止DOS攻击，这个数值必须限制在
k < 2*(iBlock<sub>current</sub> - iBlock<sub>User_reg</sub>)+20. 否则数字会被替换。
- 如果一个新block k每10分钟产生一次，这个限制意味着新用户的发帖率最大是288帖每天。平均来说。

### 7 提及（@）
如果一个新帖子（@username)提及了用户j，客户端软件也必须发一条提醒到ID<sub>j</sub>，通过包含完整信
息的方式。提醒通过DHT网络路由过去。
提及是提案架构中唯一需要路由数据包到指定用户地址ID<sub>j</sub>而不是IDnode<sub>j</sub>的特性。另一种选择是，一个不同的

ID<sub>mention_j</sub> = H([Username<sub>j</sub>, "mention"])

可以被设置用来接收和累计提及，由ID<sub>mention_j</sub>的邻居节点维护。这里唯一的问题还是“lame，重复pulling”，
因为用户需要定期地提取这个密钥（尽管比起hashtag来范围更受限）。
一个可以阻止提取用户提醒而且能一定程度保护用户隐私的方式是为目标ID<sub>j</sub>选择一些”收听者“。然后这些listeners
可以将数据包抄送到最终的用户。这些思路部分是基于SASON，尽管不是太安全，因为没有使用额外的匿名网络。

系统可能像这样工作：接收者IDj首先使用DHT网络找到ID<sub>j</sub>旁边的node。 然后他要求他们直接抄送所有ID<sub>j</sub>的
流量到ID<sub>node_j</sub>,因此只暴露他的真实身份给一小组他的lisoners。Listeners必须通过询问SIG<sub>j</sub>（随机号码）
做一个challenge验证，以确保用户是真正的ID<sub>j</sub>。因为其他节点已经访问到完整的公开密钥的字典，所以他很
容易认证。

提及，像这里描述的其他机制一样，需要客户端软件的配合才能工作。如果指定的用户不发送提醒包到网络中（和
他自己的帖子一起），那被提及的用户就永远不会知道。


### 8 显式信息请求
用户l不用加入swarm，就可以显式地向用户j请求某个特定信息。这通过从地址IDuserpostjk获取的一个简
单的认证内容来完成。
该特性能够像Twitter一样进行“上行消息分支导航”，并且不需要太多资源。

### 9 下行信息分支导航
下行导航（找出特定帖子的所有回复和转发）可能是一个困难的问题，因为”这个帖子的回复是什么？”的问题，
可能有许多，甚至可能无限的答案。一个可能的方案是另外发送一个提醒到一个特定的多值列表存储地址：
ID<sub>replies_jk</sub> = H([Username<sub>j</sub>,"replies"+k, "multi"])
要存储的内容是回复本身的复制（用户帖子的格式在章节6中定义）。同样，要使这个机制工作，需要客户端合配合
发送回复。

### 10 哈希标签
像提及一样，hashtags必须在发布到网络中的新帖子的内容中被检测到。一份复制的信息被发送到一个特殊的
多值列表存储的地址：
ID<sub>hashtagt</sub> = H([hashtag<sub>t</sub>,"hashtag", "multi"])
这和下行信息分支的导航非常相似，除了一个额外的特性：hashtag创建了一个与ID<sub>swarm_j</sub>相类似的新swarm。
这个ID<sub>hashtagt</sub>的邻居被强制加入这个虚拟的没有连续内容（文件）的swarm。含有hashtag的帖子被DHT
路由到一个swarm的邻居成员，从那里它们被广播到swarm的成员。

因此swarm仅被用来创建一个分布式的tracker和广播机制，给愿意监控这些hashtags的用户。新加入swarm
的成员也可以从多值存储中（DHT网络）请求最后的信息，但不保证完整性。

### 11 文字搜索
任意单词的搜索，可以将哈希标签的实现思路扩展到所有帖子中的所有单词中。为了减少开销和网络流量，可以
进行特定的限制，如最小单词大小，去除介词等等。
和哈希标签的另外一个区别是，为所有可能单词创建swarms被认为是过度杀伤的。所以包含某个给定单词的
帖子的集合应该被限制在一个临时的多值的列表存储中，通过下面公式寻址：
ID<sub>wordw</sub> = H([word<sub>w</sub>,“word”, “multi”])

### 12 最后备注
提议的架构提供了一个分布式的P2P的微博网络，拥有安全，可伸缩和私密的特性。
- 架构是像其他的P2P技术一样是有灵活性的，所以被认为没有单个的公司，政府或其他的实体能够关闭它。
- 分布式的用户注册机制像比特币交易一样安全，能提供内容认证而不依赖任何特殊的实体。
- 真实用户为了注册他们钟意的用户名，有动力在早期就使用这个平台。
- 使用常用的用户名，而不像在其他一些平台一样使用很长的加密哈希值，可以使系统像现在的微博系统一样对
用户友好。
- 当用户的安全性受到任何方式的危害时（比如手机被偷），公开密钥替换功能允许用户改变他的密钥对。这同时
也使得用户或公司购买他们的用户名成为可能（比如已经存在的商业域名）。
- 现有其他微博系统的主要功能都已经实现，包括搜索用户名，“导航跳转，提及他人”，私信，标签和文字搜索。
- DHT路由功能提供了一条途径，可以向特定客户发提醒或向他请求资源数据（头像，用户资料等），而不需要
知道他是否在线。
- 为了检测一个用户的IP地址或监听他的活动，该实体可能需要试图分配自己一个靠近受害者（或者一个它
所属的资源，如tracker）的IDnode。因为有从外部IP地址对IDnode认证的限制，这不是一个容易的工作。
- 拥有巨大资源的组织（有众多可选的IP地址区块）可能能够完成这个部分ID<sub>node</sub>碰撞，以侦查一个特定用户
的活动。这使得网络监听能力从大规模的监听转移到相对合理的有目标监听。
- 尽管发现一个用户的在线活动是困难的，但这不是这个架构的严格保证。要求更高私密性的用户，建议在tor
网络的基础上使用twister。
- 为了获得有限频率的广告发布权利，该架构为公司运行该系统提供了动机。这可以是盈利性的广告，
但它同时也允许一群用户加入一个社区组织来传播一些信息（如比特币的挖矿池）。所以该提议同样相当民主。
- 独立提供商们可以使用一个标准的网页界面提供来twister访问，而在后端加入P2P网络。然而，尽管这完全
合法且完全支持，但这种模式破坏了大部分的隐私和安全特性，因为提供商拥有用户的私人密钥（PRIVK)。
- 一个聪明的网页界面的解决方法可能是存储一个密码加密过的私人密钥（PRIVK）版本在服务器上，那样为了
发一条新消息，私人密钥被运行在浏览器中的javascript暂时解密。这个办法可以阻止服务器的拥有者拥有用户
的私人密钥。
- 一个用于读取用户的公开帖子和标签的只读网页界面是可行的，而且也不会危害安全。
- 资源有限的客户端（如手机）可以选择做一些优化。比如，他们可以不存储完整的块链，而只存储区块哈希表
的链。为了搜索一个特定的用户，他们可能要询问网络哪些些区块明确包含该用户的注册信息。然后客户端软件可
以只下载需要的区块而不损失任何的安全性（块的完整性是可验证的）。相对于下载整个区块，可以使用一个部分
Merkel树。

#### 参考
[1] Rachel Sklar. Hudson plane crash on twitter: First reports,best coverage. MEDIAite
http://www.mediaite.com/online/
hudson-plane-crash-on-twitter-first-reports-best-co
verage/,2009. [Online; accessed 23-July-2013].

[2] Habibul Haque Khondker. Role of the new media in the arab spring.
Glob-alizations, 8(5):675–679, 2011

[3] James Glanz. How mubarak shut down egypt’s inter-net. The Age World
http://www.theage.com.au/world/
how-mubarak-shut-down-egypts-internet-20110216-1awjj.html,
2011. [Online; accessed 23-July-2013].

[4] Margaret Warner. Syria internet shutdown: A loser’s strat-
egy. PBS Newshour http://www.pbs.org/newshour/rundown/2012/11/
syria-internet-shutdown---a-losers-strategy.html, 2012. [Online;
accessed 23-July-2013].

[5] Adam Dachis. How to foil a nationwide internet shut-
down. lifehacker
http://lifehacker.com/5746046/
how-to-foil-a-nationwide-internet-shutdown
, 2011. [Online;accessed 23-July-2013].

[6] Josh Halliday. Facebook and twitter to oppose calls for social media
blocks during riots. The Guardian http://www.guardian.co.uk/media/
2011/aug/24/uk-riots-facebook-twitter-blackberry, 2011. [Online;
accessed 23-July-2013].

[7] Wikipedia. History of the internet.
http://en.wikipedia.org/wiki/
History_of_the_Internet#Packet_switching, 2013. [Online; accessed 23-July-2013].

[8] Glenn Greenwald et al. How microsoft handed the nsa access to encrypted
messages. The Guardian
http://www.guardian.co.uk/world/2013/jul/11/microsoft-nsa-collaboration-user-data
, 2013. [Online; accessed 23-July-2013].

[9] House of Lords (UK). Surveillance: Citizens and the state, volume i.
http://www.publications.parliament.uk/pa/ld200809/ldselect/ldconst/18/18.pdf
, 2009. [Online; accessed 29-July-2013].

[10] Jonathan Warren. Bitmessage: A peer-to-peer message aut
hentication and delivery system. 2012.

[11] wikipedia. Distributed social network.
http://en.wikipedia.org/wiki/Distributed_social_network
, 2013. [Online; accessed 29-July-2013].

[12] Tianyin Xu, Yang Chen, Jin Zhao, and Xiaoming Fu. Cuckoo: towards
decentralized, socio-aware online microblogging services and data measurements.
In Proceedings of the 2nd ACM International Workshop on Hot
Topics in Planet-scale Measurement, page 4. ACM, 2010.

[13] Timothy Perfitt and Burkhard Englert. Megaphone: Fault toler
ant, scal-able, and trustworthy p2p microblogging. In Internet and Web Applications
and Services (ICIW), 2010 Fifth International Conference on
, pages 469–477. IEEE, 2010.

[14] Leucio Antonio Cutillo, Refik Molva, and Thorsten Strufe. Safeb
ook: Aprivacy-preserving online social network leveraging on real-life trust.
Com-munications Magazine, IEEEs, 47(12):94–101, 2009

[15] Satoshi Nakamoto. Bitcoin: A peer-to-peer electronic cash system.
Con-sulted, 1:2012, 2008.

[16] Petar Maymounkov and David Mazieres. Kademlia: A peer-to-pe
er infor-mation system based on the xor metric. In Peer-to-Peer Systems
, pages 53–65. Springer, 2002.

[17] Lin Wang. Attacks against peer-to-peer networks and count
ermeasures. In T-110.5290 Seminar on Network Security, 2006.

[18] Yu Yang and Lan Yang. A survey of peer-to-peer attacks and
counter attacks. In International Conference on Security & Management (SAM 2012)
, pages 176–182, 2012.

[19] Jochen Dinger and Hannes Hartenstein. Defending the sybil attack
in p2p networks: Taxonomy, challenges, and a proposal for self-registration. In
Availability, Reliability and Security, 2006. ARES 2006. The First Inter-
national Conference on, pages 8–pp. IEEE, 2006.

[20] Wikipedia. Glossary of bit种子文件 terms.
http://en.wikipedia.org/wiki/Glossary_of_Bit种子文件_terms
, 2013. [Online; accessed 23-July-2013].

[21] Brad Fitzpatrick et al. pubsubhubbub - a simple, open, webhook
based pubsub protocol and open source reference implementation.
http://code.google.com/p/pubsubhubbub/, 2013. [Online; accessed 24-July-2013].

[22] Ladar Levison. Code for using ecies to protect data (ecc+ aes + sha).
http://openssl.6102.n7.nabble.com/
Code-for-using-ECIES-to-protect-data-ECC-AES-SHA-td39269.html
, 2010. [Online; accessed 1-October-2013].

[23] Standards for Efcient Cryptography Group. Sec1: Elliptic curve cryptog-
raphy, ver. 2.
http://www.secg.org/download/aid-780/sec1-v2.pdf
,2009. [Online; accessed 1-October-2013].

[24] Henry Tsai and Aaron Harwood. A scalable anonymous server overlay
network. In Advanced Information Networking and Applications, 2006.
AINA 2006. 20th International Conference on, volume 1, pages 973–978.
IEEE, 2006.

[25] Tor项目. Tor (洋葱头路由).https://www.torproject.org,
2013. [Online; accessed 23-July-2013].
