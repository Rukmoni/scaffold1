import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { MessageCircle, X, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          pressed && styles.floatingButtonPressed,
        ]}
        onPress={() => setIsChatOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Open chat support"
      >
        <MessageCircle size={24} color={colors.white} />
      </Pressable>

      {/* Chat Modal */}
      <Modal
        isVisible={isChatOpen}
        onBackdropPress={() => setIsChatOpen(false)}
        style={isMobile ? styles.mobileModal : styles.desktopModal}
        animationIn={isMobile ? "slideInUp" : "slideInRight"}
        animationOut={isMobile ? "slideOutDown" : "slideOutRight"}
        backdropOpacity={isMobile ? 0.5 : 0.3}
      >
        <View style={styles.chatContainer}>
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderContent}>
              <View style={styles.chatHeaderLeft}>
                <View style={styles.chatAvatar}>
                  <Text style={styles.avatarText}>Bo</Text>
                </View>
                <View style={styles.chatHeaderInfo}>
                  <View style={styles.chatTitleRow}>
                    <Text style={styles.chatTitle}>Bo</Text>
                    <View style={styles.onlineIndicator} />
                    <Text style={styles.onlineText}>Online</Text>
                  </View>
                </View>
              </View>
              <View style={styles.chatHeaderActions}>
                <Pressable
                  style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
                  onPress={() => console.log('More options')}
                  accessibilityRole="button"
                  accessibilityLabel="More options"
                >
                  <MoreHorizontal size={20} color={colors.grayDark} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
                  onPress={() => setIsChatOpen(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Close chat"
                >
                  <X size={20} color={colors.grayDark} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Chat Content */}
          <View style={styles.chatContent}>
            {/* Bot Message */}
            <View style={styles.messageContainer}>
              <View style={styles.botMessage}>
                <Text style={styles.messageText}>
                  AskBo is now AI-enhanced to understand you better and respond more intelligently, 24/7.
                </Text>
              </View>
              <Text style={styles.messageTime}>Today</Text>
            </View>

            {/* Bot Avatar and Message */}
            <View style={styles.messageRow}>
              <View style={styles.messageAvatar}>
                <Text style={styles.messageAvatarText}>👋</Text>
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.botName}>Greetings! I am Bo.</Text>
                <View style={styles.botMessageBubble}>
                  <Text style={styles.botMessageText}>How may I assist you today?</Text>
                </View>
                <Text style={styles.messageTimestamp}>00:04</Text>
              </View>
            </View>

            {/* Quick Action */}
            <View style={styles.quickActionContainer}>
              <Pressable
                style={({ pressed }) => [styles.quickActionButton, pressed && styles.quickActionPressed]}
                onPress={() => console.log('Denpasar - Cairns flights Suspension')}
                accessibilityRole="button"
                accessibilityLabel="Denpasar - Cairns flights Suspension"
              >
                <Text style={styles.quickActionIcon}>⚠️</Text>
                <Text style={styles.quickActionText}>Denpasar - Cairns flights Suspension</Text>
              </Pressable>
            </View>
          </View>

          {/* Chat Input */}
          <View style={styles.chatInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPlaceholder}>Type a message...</Text>
            </View>
            <Text style={styles.inputFooter}>
              AskBo can make mistakes, so double-check it.{' '}
              <Text style={styles.inputFooterLink}>More info</Text>
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floatingButtonPressed: {
    backgroundColor: colors.successDark,
    transform: [{ scale: 0.95 }],
  },
  mobileModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  desktopModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 0,
    paddingRight: spacing.xl,
    paddingBottom: 100, // Space for floating button
  },
  chatContainer: {
    backgroundColor: colors.white,
    borderRadius: isMobile ? 0 : borderRadius.xl,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    width: isMobile ? '100%' : 400,
    height: isMobile ? '80%' : 500,
    maxHeight: isMobile ? '80%' : 500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  chatHeader: {
    backgroundColor: '#4ade80', // Light green background like in image
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  chatHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  chatAvatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.grayDarkest,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  chatTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
  },
  onlineText: {
    fontSize: typography.sizes.sm,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  closeButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  chatContent: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  botMessage: {
    backgroundColor: colors.grayLighter,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDark,
    textAlign: 'center',
  },
  messageTime: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.grayLighter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageAvatarText: {
    fontSize: typography.sizes.base,
  },
  messageContent: {
    flex: 1,
  },
  botName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    marginBottom: spacing.xs,
  },
  botMessageBubble: {
    backgroundColor: colors.grayLighter,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  botMessageText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDarkest,
  },
  messageTimestamp: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  quickActionContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fef3c7', // Light yellow background
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#fbbf24', // Yellow border
    maxWidth: '90%',
  },
  quickActionPressed: {
    backgroundColor: '#fde68a',
  },
  quickActionIcon: {
    fontSize: typography.sizes.base,
  },
  quickActionText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDarkest,
    fontWeight: typography.weights.medium,
    flex: 1,
  },
  chatInput: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    backgroundColor: colors.white,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.grayLightest,
    marginBottom: spacing.sm,
  },
  inputPlaceholder: {
    fontSize: typography.sizes.sm,
    color: colors.gray,
  },
  inputFooter: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 16,
  },
  inputFooterLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});