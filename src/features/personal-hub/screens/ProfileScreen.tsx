import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Switch, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { C, Screen, Header, Card, SectionTitle, PrimaryButton } from '../components/HubUI';
import { getPreferences, getProfile, Preferences, Profile, savePreferences, saveProfile } from '../data/localData';
import { fonts } from '@/theme/tokens';

const TIMES = ['10 minutes before', '15 minutes before', '30 minutes before', '1 hour before'];

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({ name: '', studentId: '', faculty: '', email: '' });
  const [prefs, setPrefs] = useState<Preferences>({ remindersEnabled: true, reminderTime: '30 minutes before' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    Promise.all([getProfile(), getPreferences()])
      .then(([p, pref]) => { setProfile(p); setPrefs(pref); })
      .catch(() => Alert.alert('Could not load settings', 'Please reopen this screen.'))
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof Profile, value: string) => setProfile(prev => ({ ...prev, [key]: value }));
  const choosePhoto = () => {
    if (Platform.OS === 'web') { void openGallery(); return; }
    Alert.alert('Profile photo', 'Choose where to get your photo from.', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Photo library', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
  const openCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Camera permission needed', 'Allow camera access in your device settings, or choose a photo from your gallery.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      if (!result.canceled && result.assets[0]?.uri) update('photoUri', result.assets[0].uri);
    } catch { Alert.alert('Camera unavailable', 'Could not open the camera. Try choosing a photo from your gallery.'); }
  };
  const openGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Photo permission needed', 'Allow photo library access in your device settings and try again.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      if (!result.canceled && result.assets[0]?.uri) update('photoUri', result.assets[0].uri);
    } catch { Alert.alert('Photo selection failed', 'Could not open your gallery. Please try again.'); }
  };

  const validate = () => {
    if (profile.name.trim().length < 2) return 'Enter your full name.';
    if (!/^\d{6,12}$/.test(profile.studentId.trim())) return 'Student ID must contain 6–12 digits.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) return 'Enter a valid email address.';
    if (profile.faculty.trim().length < 2) return 'Enter your faculty.';
    return null;
  };
  const save = async () => {
    const error = validate();
    if (error) { setFeedback(error); return; }
    setSaving(true);
    try {
      await saveProfile(profile);
      await savePreferences(prefs);
      setFeedback('Your profile and preferences have been saved on this device.');
    } catch { setFeedback('Your changes could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };

  if (loading) return <Screen><ActivityIndicator color={C.navy} accessibilityLabel="Loading profile" /></Screen>;

  return (
    <View style={s.page}>
      <Screen>
        <Header eyebrow="MAKE IT YOURS" title="Profile & Settings" subtitle="Keep your student details and reminders up to date." />
        <Card style={s.profileCard}>
          <View style={s.avatarWrap}>
            {profile.photoUri ? <Image source={{ uri: profile.photoUri }} style={s.avatar} /> :
              <View style={s.avatar}><Ionicons name="person" size={34} color={C.navy} /></View>}
            <Pressable accessibilityRole="button" accessibilityLabel="Change profile photo" onPress={choosePhoto} style={s.cameraButton}><Ionicons name="camera" size={15} color={C.white} /></Pressable>
          </View>
          <Text style={s.profileName}>{profile.name || 'Your name'}</Text>
          <Text style={s.profileSub}>{profile.faculty || 'Your faculty'}</Text>
          <Pressable onPress={choosePhoto}><Text style={s.changePhoto}>Change profile photo</Text></Pressable>
        </Card>

        <SectionTitle title="Student information" />
        <Card>
          <Field label="Full name" value={profile.name} placeholder="Enter your full name" onChangeText={v => update('name', v)} />
          <Field label="Student ID" value={profile.studentId} placeholder="e.g. 20240123" keyboardType="number-pad" onChangeText={v => update('studentId', v)} />
          <Field label="Faculty" value={profile.faculty} placeholder="e.g. Computer Science" onChangeText={v => update('faculty', v)} />
          <Field label="University email" value={profile.email} placeholder="name@university.edu" keyboardType="email-address" autoCapitalize="none" onChangeText={v => update('email', v)} last />
        </Card>

        <SectionTitle title="Notifications" />
        <Card>
          <View style={s.settingRow}>
            <View style={s.settingIcon}><Ionicons name="notifications-outline" size={19} color={C.navy} /></View>
            <View style={{ flex: 1 }}>
              <Text style={s.settingTitle}>Class reminders</Text>
              <Text style={s.settingSubtitle}>Choose your reminder preferences.</Text>
            </View>
            <Switch accessibilityLabel="Class reminder preference" value={prefs.remindersEnabled} onValueChange={v => setPrefs(p => ({ ...p, remindersEnabled: v }))} trackColor={{ false: '#D8DEE7', true: C.gold }} thumbColor={C.white} />
          </View>
          <View style={s.separator} />
          <Text style={s.fieldLabel}>DEFAULT REMINDER TIME</Text>
          {TIMES.map(time => (
            <Pressable key={time} accessibilityRole="radio" accessibilityState={{ checked: prefs.reminderTime === time, disabled: !prefs.remindersEnabled }} disabled={!prefs.remindersEnabled} onPress={() => setPrefs(p => ({ ...p, reminderTime: time }))} style={[s.timeOption, !prefs.remindersEnabled && { opacity: 0.5 }]}>
              <Text style={[s.timeOptionText, prefs.reminderTime === time && s.timeOptionSelected]}>{time}</Text>
              <View style={[s.radio, prefs.reminderTime === time && s.radioSelected]}>{prefs.reminderTime === time && <View style={s.radioDot} />}</View>
            </Pressable>
          ))}
          {!prefs.remindersEnabled && <Text style={s.disabledNote}>Reminders are currently turned off.</Text>}
        </Card>
        <PrimaryButton title={saving ? 'Saving…' : 'Save changes'} onPress={save} disabled={saving || loading} />
        {!!feedback && <Text accessibilityLiveRegion="polite" style={s.footnote}>{feedback}</Text>}
        <Text style={s.footnote}>Saved on this device. Reminder delivery is not enabled in this UI.</Text>
      </Screen>
    </View>
  );
}

function Field(props: { label: string; value: string; placeholder: string; onChangeText: (v: string) => void; keyboardType?: TextInputProps['keyboardType']; autoCapitalize?: TextInputProps['autoCapitalize']; last?: boolean }) {
  return <View style={{ marginBottom: props.last ? 0 : 15 }}>
    <Text style={s.fieldLabel}>{props.label}</Text>
    <TextInput accessibilityLabel={props.label} value={props.value} placeholder={props.placeholder} placeholderTextColor={C.muted} onChangeText={props.onChangeText}
      keyboardType={props.keyboardType || 'default'} autoCapitalize={props.autoCapitalize || 'words'} style={s.input} />
  </View>;
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.background },
  profileCard: { alignItems: 'center', paddingVertical: 22 },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  avatar: { width: 82, height: 82, borderRadius: 28, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  cameraButton: { position: 'absolute', right: -3, bottom: -3, width: 29, height: 29, borderRadius: 10, backgroundColor: C.navy, borderWidth: 2, borderColor: C.white, alignItems: 'center', justifyContent: 'center' },
  profileName: { color: C.navy, fontSize: 19, fontFamily: fonts.heavy },
  profileSub: { color: C.muted, fontSize: 13, marginTop: 4 },
  changePhoto: { color: C.navy2, fontSize: 12, fontFamily: fonts.heavy, marginTop: 11 },
  fieldLabel: { color: C.text, fontSize: 12, fontFamily: fonts.heavy, marginBottom: 8 },
  input: { backgroundColor: '#FAFBFC', borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, fontSize: 14, color: C.text },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  settingIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: C.goldPale, alignItems: 'center', justifyContent: 'center' },
  settingTitle: { color: C.navy, fontSize: 14, fontFamily: fonts.heavy },
  settingSubtitle: { color: C.muted, fontSize: 11, marginTop: 4 },
  separator: { height: 1, backgroundColor: C.border, marginVertical: 18 },
  timeOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 11 },
  timeOptionText: { color: C.text, fontSize: 13 },
  timeOptionSelected: { color: C.navy, fontFamily: fonts.heavy },
  radio: { width: 19, height: 19, borderRadius: 10, borderWidth: 1.5, borderColor: '#C5CDD8', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: C.navy },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: C.gold },
  disabledNote: { color: C.red, fontSize: 12, marginTop: 8 },
  footnote: { color: C.muted, fontSize: 11, textAlign: 'center', lineHeight: 17, marginTop: 13, marginBottom: 5 },
});
