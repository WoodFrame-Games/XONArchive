using System.Collections.Generic;

public static class SaveLoad
{
	private static readonly string FileName;

	private static readonly string FilePath;

	private static Dictionary<string, string> Prefs;

	static SaveLoad()
	{
	}

	public static void SetString(string key, string value)
	{
	}

	public static string GetString(string key, string defaultValue = "")
	{
		return null;
	}

	public static void SetInt(string key, int value)
	{
	}

	public static int GetInt(string key, int defaultValue = 0)
	{
		return 0;
	}

	public static void SetFloat(string key, float value)
	{
	}

	public static float GetFloat(string key, float defaultValue = 0f)
	{
		return 0f;
	}

	public static bool HasKey(string key)
	{
		return false;
	}

	public static void Save()
	{
	}

	public static void Load()
	{
	}
}
