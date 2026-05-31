using DG.Tweening;
using Photon.Pun;
using Photon.Realtime;
using TMPro;
using UnityEngine;
using UnityEngine.Localization;
using UnityEngine.UI;

public class Menu : MonoBehaviourPunCallbacks
{
	public GameObject[] Screens;

	public Sprite[] MenuBackgrounds;

	public bool ScreenTransitions;

	public float TransitionSpeed;

	public Ease TransitionEase;

	public GameObject CurrentScreen;

	public Image BackgroundImage;

	public TMP_Text MenuLogoText;

	public TMP_Text MenuLogoText2;

	public TMP_Text MenuPlayerNameText;

	public TMP_Text MenuPlayerLevelText;

	public Image MenuPlayerLevelProgress;

	public TMP_InputField WindowPlayerNameText;

	public TMP_Text WindowPlayerLevelText;

	public Image WindowPlayerLevelProgress;

	public TMP_Text WindowPlayerJoinDate;

	public TMP_Text WindowPlayerTimeInGame;

	public TMP_Text WindowPlayerBalance;

	public TMP_Text StorePlayerBalance;

	public RectTransform MenuUpperPanel;

	public RectTransform MenuLowerPanel;

	public RectTransform MenuPlayButton;

	public RectTransform MenuStoreButton;

	public RectTransform MenuSettingsButton;

	public RectTransform MenuFriendsButton;

	public RectTransform MenuGroupsButton;

	public RectTransform MenuChatButton;

	public GameObject RegisterPanel;

	public TMP_InputField RegisterNickname;

	public TMP_Text RegisterWelcomeText;

	public TMP_Text CreateServerText;

	public GameObject SelectModeMapWindow;

	public GameObject CreateServerModeWindow;

	public GameObject CreateServerMapWindow;

	public GameObject CreateServerMainWindow;

	private GameMode SelectedMode;

	private string SelectedMap;

	public TMP_InputField RoomName;

	public Slider RoomMaxPlayers;

	public TMP_Text RoomMaxPlayersCount;

	public TMP_InputField RoomPassword;

	private bool OfflineMode;

	private bool SingleMode;

	private bool OnConnectedShowPlay;

	private bool LoadingScene;

	public static Menu Instance;

	private void Awake()
	{
	}

	private void Start()
	{
	}

	private void AnimateBackground()
	{
	}

	private void Animate()
	{
	}

	public void OnRegisterButton()
	{
	}

	public void OnPlayButton()
	{
	}

	public void OnSingleGameButton()
	{
	}

	public void OnServerListButton()
	{
	}

	public void OnCreateRoomMenuButton()
	{
	}

	public void OnModeSelected(int id)
	{
	}

	public void OnMapSelected(string map)
	{
	}

	public void OnCreateRoomButton()
	{
	}

	public override void OnCreatedRoom()
	{
	}

	public void OnCreateServerCancel()
	{
	}

	public void OnUpdateMaxPlayers()
	{
	}

	public override void OnConnectedToMaster()
	{
	}

	public override void OnDisconnected(DisconnectCause cause)
	{
	}

	public void OnChangeNameButton()
	{
	}

	public void OnExitButton()
	{
	}

	public void UpdateName()
	{
	}

	private void OnLocaleChanged(Locale locale)
	{
	}

	private void Register()
	{
	}

	public void InDevelopment()
	{
	}

	public void Soon()
	{
	}

	public void OpenSocial(int id)
	{
	}

	private void UpdateUIAccountData()
	{
	}

	public static void ShowScreen(string name)
	{
	}

	public static void ShowScreen(string name, bool hideCurrent)
	{
	}

	public static void ShowScreen(string name, bool hideCurrent, float tweenTime)
	{
	}

	public void ShowScreenPublic(string name)
	{
	}

	public void ShowScreenPublic(string name, bool hideCurrent)
	{
	}

	public static void ShowScreen(string name, bool hideCurrent, bool tween, float tweenTime)
	{
	}

	public static void HideScreen(string name, bool tween, float tweenTime)
	{
	}

	public static GameObject GetScreen(string name)
	{
		return null;
	}

	public static void ShowPanel(GameObject panel)
	{
	}

	public static void HidePanel(GameObject panel)
	{
	}

	public static void ShowPanel(GameObject panel, bool tween, float tweenTime)
	{
	}

	public static void HidePanel(GameObject panel, bool tween, float tweenTime)
	{
	}
}
